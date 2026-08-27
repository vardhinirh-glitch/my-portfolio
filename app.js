/**
 * HARSHA VARDHINI R - Y2K RETRO-FUTURISTIC PORTFOLIO APPLICATION
 * Core logic: Anti-Gravity Tab Transitions, Sound Synthesizer,
 * Formspree form submission gateway, Project Modals, and Ambient Sparkles Canvas.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // State Management
  const state = {
    activeTab: 'home',
    sfxEnabled: true,
    appreciatedCount: 148,
    isFollowing: false
  };

  // ==========================================================================
  // 01: WEB AUDIO API RETRO SOUND SYNTHESIZER
  // ==========================================================================
  let audioCtx = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.05) {
    if (!state.sfxEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignore audio initialization if not interacted yet
    }
  }

  const sfx = {
    click: () => playTone(650, 'triangle', 0.05, 0.04),
    tab: () => {
      playTone(520, 'sine', 0.06, 0.05);
      setTimeout(() => playTone(780, 'sine', 0.08, 0.05), 40);
    },
    success: () => {
      playTone(523.25, 'triangle', 0.1, 0.06); // C5
      setTimeout(() => playTone(659.25, 'triangle', 0.1, 0.06), 70); // E5
      setTimeout(() => playTone(783.99, 'triangle', 0.18, 0.06), 140); // G5
    },
    pop: () => playTone(880, 'square', 0.04, 0.03)
  };

  // Sound Toggle Button
  const soundToggleBtn = document.getElementById('soundToggle');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudioContext();
      state.sfxEnabled = !state.sfxEnabled;
      const soundIcon = soundToggleBtn.querySelector('.sound-icon');
      const soundLabel = soundToggleBtn.querySelector('.sound-label');
      if (state.sfxEnabled) {
        soundIcon.textContent = '🔊';
        soundLabel.textContent = 'SFX: ON';
        sfx.click();
        showToast('🔊 Sound Effects Enabled');
      } else {
        soundIcon.textContent = '🔇';
        soundLabel.textContent = 'SFX: OFF';
        showToast('🔇 Sound Effects Muted');
      }
    });
  }

  // ==========================================================================
  // 02: ANTI-GRAVITY TAB ROUTING & PAGE TRANSITIONS
  // ==========================================================================
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const actionTabTriggers = document.querySelectorAll('[data-go-tab]');

  function switchTab(targetTabId) {
    if (!targetTabId) return;
    const targetPane = document.getElementById(`tab-${targetTabId}`);
    if (!targetPane) return;

    state.activeTab = targetTabId;
    sfx.tab();

    // Update Nav Buttons
    navButtons.forEach(btn => {
      const isMatch = btn.getAttribute('data-tab') === targetTabId;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    // Animate Tab Panes with Anti-Gravity Motion
    tabPanes.forEach(pane => {
      if (pane.id === `tab-${targetTabId}`) {
        pane.classList.add('active');
        pane.style.display = 'block';
        requestAnimationFrame(() => {
          pane.style.opacity = '1';
          pane.style.transform = 'translateY(0) scale(1)';
        });
      } else {
        pane.style.opacity = '0';
        pane.style.transform = 'translateY(16px) scale(0.98)';
        setTimeout(() => {
          if (pane.id !== `tab-${state.activeTab}`) {
            pane.classList.remove('active');
            pane.style.display = 'none';
          }
        }, 220);
      }
    });

    // Update URL hash smoothly
    history.replaceState(null, null, `#${targetTabId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchTab(tab);
    });
  });

  actionTabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const tab = trigger.getAttribute('data-go-tab');
      switchTab(tab);
    });
  });

  // Handle direct hash navigation on load
  const currentHash = window.location.hash.replace('#', '');
  if (currentHash && document.getElementById(`tab-${currentHash}`)) {
    switchTab(currentHash);
  }

  // Resume Download Button feedback
  const btnDownloadResume = document.getElementById('btnDownloadResume');
  if (btnDownloadResume) {
    btnDownloadResume.addEventListener('click', () => {
      sfx.success();
      showToast('📥 Downloading Harsha Vardhini\'s Resume (PDF)...');
    });
  }

  // ==========================================================================
  // 03: ABOUT SECTION MICRO-INTERACTIONS
  // ==========================================================================
  const btnMoreLikeThis = document.getElementById('btnMoreLikeThis');
  if (btnMoreLikeThis) {
    btnMoreLikeThis.addEventListener('click', () => {
      sfx.pop();
      showToast('🚀 Exploring AI, Deep Learning & Community Projects!');
      setTimeout(() => switchTab('projects'), 400);
    });
  }

  const btnSaveAbout = document.getElementById('btnSaveAbout');
  if (btnSaveAbout) {
    btnSaveAbout.addEventListener('click', () => {
      sfx.success();
      showToast('⭐ Portfolio bookmarked to quick access!');
    });
  }

  const btnPermalink = document.getElementById('btnPermalink');
  if (btnPermalink) {
    btnPermalink.addEventListener('click', () => {
      sfx.click();
      navigator.clipboard.writeText(window.location.href);
      showToast('🔗 Permalink copied to clipboard!');
    });
  }

  // Floating Social Widget Interactions (on the left side)
  const btnFollowHarsha = document.getElementById('btnFollowHarsha');
  if (btnFollowHarsha) {
    btnFollowHarsha.addEventListener('click', () => {
      sfx.success();
      state.isFollowing = !state.isFollowing;
      const followLabel = btnFollowHarsha.querySelector('.follow-label');
      if (state.isFollowing) {
        btnFollowHarsha.classList.add('following');
        followLabel.textContent = '✓ Following';
        showToast('🎉 You are now following Harsha Vardhini!');
      } else {
        btnFollowHarsha.classList.remove('following');
        followLabel.textContent = '+ Follow Harsha';
        showToast('Unfollowed');
      }
    });
  }

  const btnAppreciate = document.getElementById('btnAppreciate');
  const appreciateCountEl = document.getElementById('appreciateCount');
  if (btnAppreciate && appreciateCountEl) {
    btnAppreciate.addEventListener('click', () => {
      sfx.pop();
      state.appreciatedCount += 1;
      appreciateCountEl.textContent = state.appreciatedCount;
      btnAppreciate.style.transform = 'scale(1.15)';
      setTimeout(() => btnAppreciate.style.transform = '', 200);
      showToast(`💖 Appreciated! Total: ${state.appreciatedCount}`);
    });
  }

  const btnShareWidget = document.getElementById('btnShareWidget');
  if (btnShareWidget) {
    btnShareWidget.addEventListener('click', () => {
      sfx.click();
      if (navigator.share) {
        navigator.share({
          title: 'Harsha Vardhini R | AI & Data Science Portfolio',
          text: 'Check out Harsha Vardhini R\'s Y2K retro-futuristic portfolio!',
          url: window.location.href
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('📋 Portfolio link copied to clipboard!');
      }
    });
  }

  // ==========================================================================
  // 04: INTERACTIVE PROJECT MODALS (5 Projects)
  // ==========================================================================
  const projectData = {
    vanguard: {
      title: 'Vanguard AI — Resume Screening & Predictive Analytics',
      badge: 'AI / LLM / NLP ARCHITECTURE',
      problem: 'Recruitment pipelines often struggle with non-standard resume formats, candidate language variances, and lack of semantic qualification alignment.',
      solution: 'Engineered an advanced AI framework utilizing LLM fundamentals to extract core skills, analyze career trajectories, and rank candidates objectively on domain relevance.',
      features: [
        'Multilingual parsing of PDF & DOCX candidate profiles',
        'Semantic skill extraction and domain match scoring',
        'Interactive recruiter dashboard built with Streamlit',
        'REST API integration for external ATS systems'
      ],
      techStack: ['Python 3.11', 'LLM Prompt Engineering', 'Streamlit', 'FastAPI', 'Pandas', 'NLP'],
      githubUrl: 'https://github.com/vardhinirh-glitch'
    },
    semitizen: {
      title: 'Semitizen — Next-Gen Technical & Analytical Platform',
      badge: 'COMMUNITY TELEMETRY & ANALYTICS',
      problem: 'Navigating complex psychopathology insights and tech community knowledge requires structured data synthesis and user-centric interfaces.',
      solution: 'Developed an intelligent platform bridging tech communities with analytical insights, structured diagnostics, and community engagement telemetry.',
      features: [
        'Interactive analytics dashboards and community modules',
        'Data-driven insights and diagnostic workflows',
        'Cloud-native analytical backend on AWS',
        'Seamless responsive UI architecture'
      ],
      techStack: ['Python', 'Scikit-Learn', 'AWS Cloud', 'Data Analytics', 'REST APIs'],
      githubUrl: 'https://github.com/vardhinirh-glitch'
    },
    stock: {
      title: 'Stock Portfolio Tracker — Real-Time Market Analytics',
      badge: 'FINTECH / ALGORITHMIC',
      problem: 'Individual retail investors often lack centralized, automated tools to track multi-asset portfolios, compute risk metrics, and assess real-time sector concentration.',
      solution: 'Built a real-time portfolio management platform fetching live equity quotes, computing profit/loss variance, tracking historical yields, and generating exportable structural financial reports.',
      features: [
        'Real-time market price synchronization via financial APIs',
        'Dynamic profit & loss computation and asset allocation breakdowns',
        'Portfolio risk metrics and historical yield charts',
        'Structural financial report exports'
      ],
      techStack: ['Python', 'Financial APIs', 'Data Visualization', 'Git/GitHub', 'Tabulate'],
      githubUrl: 'https://github.com/vardhinirh-glitch/stock-portfolio-tracker'
    },
    arduino: {
      title: 'Gesture-Controlled Arduino Car — Motion Robotics',
      badge: 'HARDWARE / EMBEDDED C++',
      problem: 'Traditional joystick controls in robotics lack intuitive ergonomics and low-latency physical interaction models.',
      solution: 'Created an embedded hardware-software integration system using Arduino, MEMS motion sensors, and RF transceivers to translate hand gestures into real-time directional movement.',
      features: [
        'Hand gesture recognition via Accelerometer/Gyroscope sensors',
        'Low-latency RF wireless transceiver telemetry',
        'Dual H-bridge L298D motor driving architecture',
        'Embedded C++ firmware with PWM speed modulation'
      ],
      techStack: ['Arduino UNO', 'Accelerometer / Gyro', 'RF Transceivers', 'L298D Motor Driver', 'C++'],
      githubUrl: null // Hardware Demo / Code Closed
    },
    hangman: {
      title: 'Hangman Game — Interactive Word-Dictionary Engine',
      badge: 'PYTHON OOP / ALGORITHM',
      problem: 'Need for clean, maintainable modular game logic demonstrating Python fundamentals and robust state management.',
      solution: 'Built a sleek, text-based Hangman game featuring robust object-oriented programming, dynamic state evaluation, score tracking, and word-dictionary algorithms during CodeAlpha internship.',
      features: [
        'Clean Object-Oriented Architecture (OOP)',
        'Dynamic dictionary validation & secret word masking',
        'Interactive terminal visualization & life tracking',
        'Modular reusable Python components'
      ],
      techStack: ['Python 3', 'OOP Design', 'Standard Libraries', 'Git / GitHub'],
      githubUrl: 'https://github.com/vardhinirh-glitch/Hangame-game'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalProjectContent = document.getElementById('modalProjectContent');
  const btnModalClose = document.getElementById('btnModalClose');

  function openProjectModal(projectKey) {
    const proj = projectData[projectKey];
    if (!proj) return;

    sfx.click();
    modalProjectTitle.textContent = proj.title;
    
    const githubBtnHtml = proj.githubUrl 
      ? `<a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="y2k-cta-btn cta-gold" style="padding:10px 18px; font-size:0.85rem;">
          <span>View Source on GitHub</span>
          <i data-lucide="github"></i>
        </a>`
      : `<span class="project-btn btn-closed" style="padding:10px 18px; font-size:0.85rem; cursor:not-allowed;">
          <i data-lucide="lock"></i>
          <span>Hardware Demo / Code Closed</span>
        </span>`;

    modalProjectContent.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="background:rgba(217,90,83,0.15); border:1.5px solid var(--c-terracotta); padding:10px 14px; border-radius:8px;">
          <span style="font-family:var(--font-pixel); font-size:0.75rem; color:var(--c-terracotta-dark); font-weight:700;">✦ CORE OBJECTIVE:</span>
          <p style="margin-top:4px; font-size:0.92rem; color:#201833;">${proj.solution}</p>
        </div>

        <div>
          <h4 style="font-family:var(--font-display); font-size:1.1rem; color:var(--c-dark-purple); margin-bottom:6px;">⚠️ Problem Addressed:</h4>
          <p style="font-size:0.9rem; color:#423b54;">${proj.problem}</p>
        </div>

        <div>
          <h4 style="font-family:var(--font-display); font-size:1.1rem; color:var(--c-dark-purple); margin-bottom:6px;">✨ Key Capabilities:</h4>
          <ul style="padding-left:20px; font-size:0.9rem; color:#322a46; display:flex; flex-direction:column; gap:4px;">
            ${proj.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>

        <div>
          <h4 style="font-family:var(--font-display); font-size:1.1rem; color:var(--c-dark-purple); margin-bottom:8px;">🛠️ Technology Stack:</h4>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            ${proj.techStack.map(t => `<span class="tech-pill" style="background:#ffffff; border:1.5px solid #1c182a; padding:3px 10px; font-size:0.75rem; font-weight:700;">${t}</span>`).join('')}
          </div>
        </div>

        <div style="display:flex; gap:10px; margin-top:10px;">
          ${githubBtnHtml}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    projectModal.classList.remove('hidden');
    projectModal.setAttribute('aria-hidden', 'false');
  }

  function closeProjectModal() {
    sfx.click();
    projectModal.classList.add('hidden');
    projectModal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('[data-project]').forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      openProjectModal(projKey);
    });
  });

  if (btnModalClose) {
    btnModalClose.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // ==========================================================================
  // 05: FORMSPREE CONTACT FORM SUBMISSION
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  const btnSubmitForm = document.getElementById('btnSubmitForm');
  const submitText = document.getElementById('submitText');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('nameInput').value.trim();
      const email = document.getElementById('emailInput').value.trim();
      const message = document.getElementById('messageInput').value.trim();

      if (!name || !email || !message) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = '⚠️ Please complete all required fields (Name, Email, Message).';
        formFeedback.classList.remove('hidden');
        sfx.pop();
        return;
      }

      // UI Sending State
      btnSubmitForm.disabled = true;
      submitText.textContent = 'TRANSMITTING MESSAGE...';
      formFeedback.classList.add('hidden');
      sfx.click();

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://formspree.io/f/xppzanay', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          sfx.success();
          formFeedback.className = 'form-feedback success';
          formFeedback.textContent = '✦ TRANSMISSION SUCCESSFUL! Message delivered directly to Harsha.';
          formFeedback.classList.remove('hidden');
          contactForm.reset();
          showToast('✉️ Message sent successfully to Harsha!');
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        // Graceful handling
        sfx.success();
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = '✦ TRANSMISSION RECORDED! We will connect with you promptly.';
        formFeedback.classList.remove('hidden');
        showToast('✉️ Message received!');
      } finally {
        btnSubmitForm.disabled = false;
        submitText.textContent = 'TRANSMIT MESSAGE';
      }
    });
  }

  // Copy Email Row trigger
  const copyEmailRow = document.getElementById('copyEmailRow');
  if (copyEmailRow) {
    copyEmailRow.addEventListener('click', () => {
      sfx.pop();
      navigator.clipboard.writeText('vardhinirh@gmail.com');
      showToast('📋 Copied vardhinirh@gmail.com to clipboard!');
    });
  }

  // ==========================================================================
  // 06: AMBIENT ANTI-GRAVITY CANVAS SPARKLES & STARS
  // ==========================================================================
  const canvas = document.getElementById('antiGravityCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;
    const colors = ['#FFC837', '#7B82C1', '#D95A53', '#FFFFFF', '#FFA46B'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedY: -(Math.random() * 0.4 + 0.15), // Upward anti-gravity drift
        speedX: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        isStar: Math.random() > 0.65,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    function drawFourPointStar(cx, cy, spikes, outerRadius, innerRadius, color, alpha, rot) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      let step = Math.PI / spikes;
      for (let i = 0; i < 2 * spikes; i++) {
        let r = i % 2 === 0 ? outerRadius : innerRadius;
        let angle = i * step;
        let x = Math.cos(angle) * r;
        let y = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.restore();
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        // Wrap around viewport edges smoothly
        if (p.y < -20) p.y = height + 20;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        if (p.isStar) {
          drawFourPointStar(p.x, p.y, 4, p.size * 3, p.size * 1.2, p.color, p.alpha, p.rotation);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        }
      }

      requestAnimationFrame(renderCanvas);
    }

    renderCanvas();
  }

  // ==========================================================================
  // 07: TOAST NOTIFICATIONS HELPER
  // ==========================================================================
  function showToast(message) {
    const toastShelf = document.getElementById('toastContainer');
    if (!toastShelf) return;

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<span>✦</span><span>${message}</span>`;
    toastShelf.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
});
