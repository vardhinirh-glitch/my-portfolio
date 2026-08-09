document.addEventListener("DOMContentLoaded", () => {
  // Check for saved local content from Admin CMS or fallback to default
  const savedData = localStorage.getItem("portfolioData");
  const data = savedData ? JSON.parse(savedData) : portfolioData;

  // 1. Load Profile
  document.getElementById("heroName").innerText = data.profile.name;
  document.getElementById("heroRole").innerText = data.profile.title;
  document.getElementById("heroTagline").innerText = data.profile.tagline;
  document.getElementById("heroLocation").innerText = data.profile.location;
  document.getElementById("resumeBtn").setAttribute("href", data.profile.resumeUrl);

  document.getElementById("contactEmail").innerText = data.profile.contact.email;
  document.getElementById("contactEmail").setAttribute("href", `mailto:${data.profile.contact.email}`);
  document.getElementById("contactPhone").innerText = data.profile.contact.phone;
  document.getElementById("contactPhone").setAttribute("href", `tel:${data.profile.contact.phone}`);
  document.getElementById("contactLinkedin").setAttribute("href", data.profile.contact.linkedin);
  document.getElementById("contactGithub").setAttribute("href", data.profile.contact.github);

  document.getElementById("year").innerText = new Date().getFullYear();

  // 2. Render Nav Links
  const navLinksContainer = document.getElementById("navLinks");
  navLinksContainer.innerHTML = "";
  const visibleSections = data.sections.filter(s => s.visible).sort((a, b) => a.order - b.order);

  visibleSections.forEach(sec => {
    const link = document.createElement("a");
    link.href = `#portfolio-deck`;
    link.innerText = sec.title;
    navLinksContainer.appendChild(link);
  });

  // 3. Render 3D Cylindrical Orbiting Papers
  const carousel = document.getElementById("carousel3d");
  carousel.innerHTML = "";
  const count = visibleSections.length;
  const radius = 420; // Radius of 3D orbit

  visibleSections.forEach((sec, idx) => {
    const angle = (idx / count) * 360;
    const card = document.createElement("div");
    card.className = "paper-card";
    
    // Position cards evenly around a 3D circle
    card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

    // Preview snippet generator
    let previewHtml = "";
    if (sec.type === "about") {
      previewHtml = `<p>${sec.content.bio.substring(0, 120)}...</p>`;
    } else if (sec.type === "projects") {
      previewHtml = sec.content.map(p => `<p><strong>${p.name}</strong></p>`).join("");
    } else if (sec.type === "experience") {
      previewHtml = sec.content.map(e => `<p><strong>${e.position}</strong> @ ${e.organization}</p>`).join("");
    } else if (sec.type === "certifications") {
      previewHtml = sec.content.map(c => `<p>&bull; ${c.name}</p>`).join("");
    } else if (sec.type === "hackathons") {
      previewHtml = sec.content.map(h => `<p><strong>${h.title}</strong>: ${h.achievement}</p>`).join("");
    } else if (sec.type === "leadership") {
      previewHtml = sec.content.map(l => `<p><strong>${l.role}</strong> — ${l.organization}</p>`).join("");
    } else if (sec.type === "speaking") {
      previewHtml = sec.content.slice(0, 2).map(s => `<p>&bull; ${s.event} (${s.role})</p>`).join("");
    } else {
      previewHtml = `<p>Click to open ${sec.title}</p>`;
    }

    card.innerHTML = `
      <div class="paper-card-header">
        <h3>${sec.title}</h3>
      </div>
      <div class="paper-card-body">
        ${previewHtml}
      </div>
      <div class="paper-card-footer">
        Open Paper &rarr;
      </div>
    `;

    card.addEventListener("click", () => openModal(sec));
    carousel.appendChild(card);
  });

  // 4. Scroll & Interactive Orbit Motion
  let rotationAngle = 0;
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    rotationAngle = scrollPos * 0.15;
    if (window.innerWidth > 768) {
      carousel.style.transform = `rotateY(${rotationAngle}deg)`;
    }
  });

  // 5. Modal Paper Renderers (Fixing Leadership & Code Rendering)
  const modal = document.getElementById("paperModal");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  function openModal(section) {
    let fullHtml = `<h3>${section.title}</h3>`;

    if (section.type === "about") {
      const c = section.content;
      fullHtml += `
        <p>${c.bio}</p><br>
        <h4>ACADEMIC PROFILE</h4>
        <ul>
          <li><strong>Degree:</strong> ${c.academic.degree} (${c.academic.branch})[cite: 1]</li>
          <li><strong>College:</strong> ${c.academic.college}[cite: 1]</li>
          <li><strong>Year:</strong> ${c.academic.currentYear} (Graduation: ${c.academic.expectedGraduation})[cite: 1]</li>
        </ul>
      `;
    } else if (section.type === "projects") {
      fullHtml += section.content.map(p => `
        <div class="modal-item">
          <h4>${p.name}</h4>
          <p><strong>Problem:</strong> ${p.problem}</p>
          <p><strong>Solution:</strong> ${p.solution}</p>
          <p><strong>Tech:</strong> ${p.technologies.join(", ")}</p>
        </div>
      `).join("");
    } else if (section.type === "experience") {
      fullHtml += section.content.map(e => `
        <div class="modal-item">
          <h4>${e.position} — ${e.organization}</h4>
          <p><em>${e.duration} | ${e.type}</em></p>
          ${e.responsibilities ? `<p>${e.responsibilities.join(", ")}</p>` : ""}
        </div>
      `).join("");
    } else if (section.type === "leadership") {
      // PROPER HUMAN-READABLE RENDERING (NO RAW CODE)
      fullHtml += section.content.map(item => `
        <div class="modal-item">
          <h4>${item.role}</h4>
          <p><strong>Organization:</strong> ${item.organization}</p>
          <p>${item.details}</p>
        </div>
      `).join("");
    } else if (section.type === "hackathons") {
      fullHtml += section.content.map(h => `
        <div class="modal-item">
          <h4>${h.title}</h4>
          <p><strong>Result:</strong> ${h.achievement}</p>
          <p>${h.description}</p>
        </div>
      `).join("");
    } else if (section.type === "certifications") {
      fullHtml += `<ul>${section.content.map(c => `<li><strong>${c.name}</strong> (${c.issuer})</li>`).join("")}</ul>`;
    } else if (section.type === "speaking") {
      fullHtml += section.content.map(s => `
        <div class="modal-item">
          <h4>${s.event}</h4>
          <p><strong>Role:</strong> ${s.role} (${s.type})</p>
          ${s.note ? `<p><em>${s.note}</em></p>` : ""}
        </div>
      `).join("");
    } else {
      fullHtml += `<p>${JSON.stringify(section.content)}</p>`;
    }

    modalBody.innerHTML = fullHtml;
    modal.classList.add("active");
  }

  modalClose.addEventListener("click", () => modal.classList.remove("active"));
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("active"); });
});
