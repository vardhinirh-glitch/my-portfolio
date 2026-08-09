document.addEventListener("DOMContentLoaded", () => {
  // 1. Populate Profile Information
  document.getElementById("heroName").innerText = portfolioData.profile.name;
  document.getElementById("heroRole").innerText = portfolioData.profile.title;
  document.getElementById("heroTagline").innerText = portfolioData.profile.tagline;
  document.getElementById("heroLocation").innerText = portfolioData.profile.location;
  document.getElementById("resumeBtn").setAttribute("href", portfolioData.profile.resumeUrl);
  
  document.getElementById("contactEmail").innerText = portfolioData.profile.contact.email;
  document.getElementById("contactEmail").setAttribute("href", `mailto:${portfolioData.profile.contact.email}`);
  
  document.getElementById("contactPhone").innerText = portfolioData.profile.contact.phone;
  document.getElementById("contactPhone").setAttribute("href", `tel:${portfolioData.profile.contact.phone}`);
  
  document.getElementById("contactLinkedin").setAttribute("href", portfolioData.profile.contact.linkedin);
  document.getElementById("contactGithub").setAttribute("href", portfolioData.profile.contact.github);
  
  document.getElementById("year").innerText = new Date().getFullYear();

  // 2. Render Navigation Links Dynamically
  const navLinksContainer = document.getElementById("navLinks");
  portfolioData.sections
    .filter(s => s.visible)
    .sort((a, b) => a.order - b.order)
    .forEach(sec => {
      const link = document.createElement("a");
      link.href = `#sec-${sec.id}`;
      link.innerText = sec.title.split(" ")[0];
      navLinksContainer.appendChild(link);
    });

  // 3. Render Floating Paper 3D Deck
  const stage = document.getElementById("stage3d");
  
  portfolioData.sections
    .filter(s => s.visible)
    .sort((a, b) => a.order - b.order)
    .forEach((sec, idx) => {
      const card = document.createElement("div");
      card.className = "paper-card";
      card.id = `sec-${sec.id}`;
      
      // Calculate floating tilts for staggered subtle 3D appearance
      const rotY = (idx % 2 === 0 ? 1 : -1) * (4 + idx);
      const rotX = (idx % 3 === 0 ? 1 : -1) * 3;
      card.style.setProperty("--rot-y", `${rotY}deg`);
      card.style.setProperty("--rot-x", `${rotX}deg`);

      // Content Preview Generator based on Section Type
      let previewHtml = "";
      if (sec.type === "about") {
        previewHtml = `<p>${sec.content.bio.substring(0, 140)}...</p>`;
      } else if (sec.type === "projects") {
        previewHtml = `<p><strong>${sec.content[0].name}</strong></p><p>${sec.content[0].description}</p>`;
      } else if (sec.type === "experience") {
        previewHtml = sec.content.map(exp => `<p><strong>${exp.position}</strong> @ ${exp.organization}</p>`).join("");
      } else if (sec.type === "certifications") {
        previewHtml = sec.content.map(c => `<p>&bull; ${c.name} (${c.issuer})</p>`).join("");
      } else if (sec.type === "hackathons") {
        previewHtml = sec.content.map(h => `<p><strong>${h.title}</strong>: ${h.achievement}</p>`).join("");
      } else if (sec.type === "leadership") {
        previewHtml = sec.content.map(l => `<p><strong>${l.role}</strong> - ${l.organization}</p>`).join("");
      } else if (sec.type === "speaking") {
        previewHtml = sec.content.slice(0, 3).map(s => `<p>&bull; ${s.event} (${s.role})</p>`).join("");
      } else {
        // Fallback preview for any new dynamic section added in the future
        previewHtml = `<p>Click to view ${sec.title} details.</p>`;
      }

      card.innerHTML = `
        <div class="paper-card-header">
          <h3>${sec.title}</h3>
        </div>
        <div class="paper-card-body">
          ${previewHtml}
        </div>
        <div class="paper-card-footer">
          Click to Open Paper &rarr;
        </div>
      `;

      card.addEventListener("click", () => openModal(sec));
      stage.appendChild(card);
    });

  // 4. Parallax Effect on Mouse Move
  document.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll(".paper-card");
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 15;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 15;

    cards.forEach(card => {
      card.style.transform = `rotateY(${mouseX}deg) rotateX(${-mouseY}deg)`;
    });
  });

  // 5. Modal Paper Details Renderer
  const modal = document.getElementById("paperModal");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  function openModal(section) {
    let fullHtml = `<h3>${section.title}</h3>`;

    if (section.type === "about") {
      const c = section.content;
      fullHtml += `
        <p>${c.bio}</p>
        <br>
        <h4>ACADEMIC PROFILE</h4>
        <ul>
          <li><strong>Degree:</strong> ${c.academic.degree} (${c.academic.branch})[cite: 1]</li>
          <li><strong>Institution:</strong> ${c.academic.college}[cite: 1]</li>
          <li><strong>Status:</strong> ${c.academic.currentYear} (Graduation: ${c.academic.expectedGraduation})[cite: 1]</li>
        </ul>
        <br>
        <h4>CURRENT FOCUS</h4>
        <ul>${c.focus.map(item => `<li>${item}</li>`).join("")}</ul>
      `;
    } else if (section.type === "projects") {
      fullHtml += section.content.map(p => `
        <div class="modal-item">
          <h4>${p.name}</h4>
          <p><strong>Problem:</strong> ${p.problem}</p>
          <p><strong>Solution:</strong> ${p.solution}</p>
          <p><strong>Tech Stack:</strong> ${p.technologies.join(", ")}</p>
          ${p.github ? `<p><a href="${p.github}" target="_blank">View on GitHub &rarr;</a></p>` : ""}
        </div>
      `).join("<hr><br>");
    } else if (section.type === "experience") {
      fullHtml += section.content.map(e => `
        <div class="modal-item">
          <h4>${e.position} — ${e.organization}</h4>
          <p><em>${e.duration} | ${e.type}</em></p>
          ${e.projects ? `<p><strong>Projects:</strong> ${e.projects.map(pr => `<a href="${pr.url}" target="_blank">${pr.name}</a>`).join(", ")}</p>` : ""}
          ${e.responsibilities ? `<p><strong>Responsibilities:</strong> ${e.responsibilities.join(", ")}</p>` : ""}
        </div>
      `).join("<hr><br>");
    } else if (section.type === "certifications") {
      fullHtml += `<ul>${section.content.map(cert => `<li><strong>${cert.name}</strong> — ${cert.issuer} (${cert.date})</li>`).join("")}</ul>`;
    } else if (section.type === "hackathons") {
      fullHtml += section.content.map(h => `
        <div class="modal-item">
          <h4>${h.title}</h4>
          <p><strong>Result:</strong> ${h.achievement}</p>
          <p>${h.description}</p>
        </div>
      `).join("<br>");
    } else if (section.type === "speaking") {
      fullHtml += section.content.map(s => `
        <div class="modal-item">
          <h4>${s.event}</h4>
          <p><strong>Role:</strong> ${s.role} (${s.type})</p>
          ${s.note ? `<p><em>${s.note}</em></p>` : ""}
        </div>
      `).join("<br>");
    } else {
      // Default renderer for future custom added dynamic sections
      fullHtml += `<pre>${JSON.stringify(section.content, null, 2)}</pre>`;
    }

    modalBody.innerHTML = fullHtml;
    modal.classList.add("active");
  }

  modalClose.addEventListener("click", () => modal.classList.remove("active"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });
});