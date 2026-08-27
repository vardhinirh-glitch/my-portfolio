# Harsha Vardhini R — Y2K Retro-Futuristic Anti-Gravity Portfolio

A high-performance personal portfolio web application inspired by the visual canvas aesthetic of creator Ainin, styled with Y2K retro-futurism, tactile micro-interactions, anti-gravity swinging animations, and seamless tab transitions.

---

## 🌟 Key Features

1. **Anti-Gravity Hero Section**:
   - Dedicated swinging canvas frame with realistic pendulum physics (`antiGravitySwing` keyframes) and dynamic ground shadow breathing.
   - Interactive 3D mouse parallax tilt on hover.
   - Status indicators, direct "Download Resume" (`resume.pdf`), LinkedIn and GitHub social chips.

2. **Faithful About Me Canvas**:
   - Replicates Harsha's custom artwork and Ainin's layout structure.
   - Top action pills (`More Like This`, `Save`, `Permalink`) with live toast notifications.
   - Exact bio & 3 core highlights (lead @ CodeSapiens, Technical Executive at Nexora, Python/ML/AWS expertise).
   - Recreated interactive bottom-right social widget (`+ Follow Harsha`, `Appreciate` click counter, `Share`, `Comment`).

3. **Featured Projects Showcase**:
   - **Vanguard AI**: Multilingual AI Resume Screening System (Python, LLM, Streamlit, REST APIs).
   - **Semitizen**: Semiconductor & Hardware-Software AI Co-Design platform.
   - **Stock Portfolio Tracker**: Real-time financial analytics & risk calculation engine.
   - Interactive Specification modal sheets with architecture highlights and GitHub links.

4. **Faithful Dual-Panel Skills Layout**:
   - **Left Gradient Purple Panel (`certificatiØn`)**: AWS Cloud Computing 101, AWS GenAI, AWS Machine Learning Foundation, EDGEX 12-Hour AI Hackathon Finalist, Top 50 AI/DS Track, Model United Nations (MUN) Special Mention.
   - **Right Top Panel (`sØftwares`)**: 3D glossy isometric tool badges (Python, AWS, PyTorch, Git, Streamlit, VS Code, REST APIs, Figma).
   - **Right Bottom Panel (`expeRtise`)**: Angled, overlapping Y2K stickers (Starburst for Deep Learning, Speech Bubble for AWS Cloud, Halftone pill for GenAI, Rotating leadership badge, Grid tape for Scalable Algorithms).

5. **EmailJS Contact Gateway**:
   - Retro computer terminal window (`EMAILJS_GATEWAY_V2.exe`) sending messages directly to `vardhinirh@gmail.com`.
   - Copy-to-clipboard email shortcut and direct social channel tiles.

6. **Audio Synthesizer & Canvas Motion**:
   - Built-in Web Audio API tactile sound synthesizer (subtle clicks, pops, and chimes on hover and tab switch).
   - Floating anti-gravity star particles and dust sparkles in background.

---

## 🚀 How to Run Locally

You can run this project with any local server or simply double-click `index.html`:

### Option A: Python HTTP Server
```bash
cd y2k-portfolio
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

### Option B: Deploy to GitHub Pages / Vercel
Push the repository to GitHub and enable **GitHub Pages** from `Settings -> Pages -> Branch: main / root`.

---

## 📬 EmailJS Setup Guide

To activate direct live form transmissions through EmailJS:
1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. Add an Email Service (e.g. Gmail) connected to `vardhinirh@gmail.com`.
3. Create an Email Template with fields `{{from_name}}`, `{{from_email}}`, `{{subject}}`, and `{{message}}`.
4. Update the configuration object in `app.js`:
```javascript
emailConfig: {
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  recipientEmail: 'vardhinirh@gmail.com'
}
```
*(If unconfigured, the application gracefully provides instant visual confirmation and clipboard options).*
