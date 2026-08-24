document.addEventListener("DOMContentLoaded", () => {
  // Validate data existence
  if (typeof portfolioData === "undefined") {
    console.error("portfolioData failed to load from data.js!");
    return;
  }

  // 1. Hero Section Binding
  document.getElementById("hero-name").textContent = portfolioData.hero.name;
  document.getElementById("hero-titles").textContent = portfolioData.hero.titles;
  document.getElementById("hero-desc").textContent = portfolioData.hero.description;
  document.getElementById("hero-img").src = portfolioData.hero.profileImg;
  document.getElementById("hero-resume").href = portfolioData.hero.resumeLink;
  
  const socialsContainer = document.getElementById("hero-socials");
  socialsContainer.innerHTML = `
    <a href="${portfolioData.hero.socials.github}" target="_blank" class="social-btn">GitHub</a>
    <a href="${portfolioData.hero.socials.linkedin}" target="_blank" class="social-btn">LinkedIn</a>
  `;

  // 2. Skills Section Binding (Ainin Software Badge Style)
  const skillsContainer = document.getElementById("skills-container");
  skillsContainer.innerHTML = portfolioData.skills.map(skill => `
    <div class="skill-badge">
      <span class="sparkle-icon">✦</span>
      <span>${skill.name}</span>
    </div>
  `).join("");

  // 3. Projects Section Binding
  const projectsContainer = document.getElementById("projects-container");
  projectsContainer.innerHTML = portfolioData.projects.map(proj => `
    <div class="y2k-card project-card">
      <div class="file-header">
        <span class="file-title">${proj.path}</span>
        <span class="sparkle-icon">✧</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${proj.title}</h3>
        <p>${proj.description}</p>
        <div class="project-tags">
          ${proj.tags.map(tag => `<span class="pixel-pill lavender">${tag}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");

  // 4. Experience Section Binding
  const experienceContainer = document.getElementById("experience-container");
  experienceContainer.innerHTML = portfolioData.experience.map(exp => `
    <div class="timeline-item">
      <div class="timeline-role">${exp.role}</div>
      <div class="timeline-org">${exp.organization} • ${exp.duration}</div>
      <p>${exp.details}</p>
    </div>
  `).join("");

  // 5. Leadership Section Binding
  const leadershipContainer = document.getElementById("leadership-container");
  leadershipContainer.innerHTML = portfolioData.leadership.map(item => `
    <div class="y2k-card leadership-card">
      <div class="metric-banner">${item.metric}</div>
      <h3 style="font-family: var(--font-heading); margin-bottom: 6px;">${item.title}</h3>
      <p>${item.description}</p>
    </div>
  `).join("");

  // 6. Certifications Section Binding
  const certContainer = document.getElementById("certifications-container");
  certContainer.innerHTML = portfolioData.certifications.map(cert => `
    <div class="y2k-card cert-card">
      <span class="pixel-pill terracotta" style="margin-bottom: 10px;">${cert.tag}</span>
      <h4 style="font-family: var(--font-heading); font-size: 1.1rem; margin-top: 8px;">${cert.title}</h4>
      <p style="font-size: 0.85rem; color: var(--lavender); font-weight: 700;">${cert.issuer}</p>
    </div>
  `).join("");

  // 7. Contact Section & Email Connection Logic
  document.getElementById("contact-email-text").textContent = `Email: ${portfolioData.contact.email}`;
  document.getElementById("contact-socials").innerHTML = `
    <a href="${portfolioData.contact.github}" target="_blank" class="social-btn">GitHub</a>
    <a href="${portfolioData.contact.linkedin}" target="_blank" class="social-btn">LinkedIn</a>
  `;

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.style.color = "var(--terracotta)";
    formStatus.textContent = "✦ Transmission Sent Successfully! I will get back to you soon.";
    contactForm.reset();
  });
});
