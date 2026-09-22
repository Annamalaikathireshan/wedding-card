/**
 * Interactive Wax Seal Envelope Unboxing Controller
 * (Silent / Music-Free as requested)
 */

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('envelope-overlay');
  const envelope = document.getElementById('envelope-wrapper');
  const waxSeal = document.getElementById('wax-seal');
  const skipBtn = document.getElementById('envelope-skip');
  const reopenBtns = document.querySelectorAll('.reopen-envelope-btn');

  if (!overlay || !envelope) return;

  // Initialize envelope background particles
  if (window.ParticleSystem) {
    new window.ParticleSystem('envelope-canvas');
  }

  // Check if envelope was already opened during this session
  const wasOpened = sessionStorage.getItem('wedding_envelope_opened');
  if (wasOpened === 'true') {
    overlay.classList.add('hidden-envelope');
  }

  function openEnvelope() {
    if (envelope.classList.contains('is-open')) return;
    envelope.classList.add('is-open');

    // Trigger auspicious golden sparkle particle burst at seal center
    triggerSealBurst();

    // Mark as opened in session
    sessionStorage.setItem('wedding_envelope_opened', 'true');

    // Smooth transition into website
    setTimeout(() => {
      overlay.classList.add('hidden-envelope');
    }, 1300);
  }

  function reopenEnvelope() {
    overlay.classList.remove('hidden-envelope');
    envelope.classList.remove('is-open');
  }

  function skipEnvelope() {
    overlay.classList.add('hidden-envelope');
    sessionStorage.setItem('wedding_envelope_opened', 'true');
  }

  // Event Listeners
  if (waxSeal) {
    waxSeal.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelope();
    });
  }

  envelope.addEventListener('click', () => {
    openEnvelope();
  });

  // Accessible keyboard controls (Enter / Space)
  envelope.setAttribute('tabindex', '0');
  envelope.setAttribute('role', 'button');
  envelope.setAttribute('aria-label', 'Open Wedding Invitation Envelope');
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      skipEnvelope();
    });
  }

  reopenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      reopenEnvelope();
    });
  });

  // Burst particle effect when wax seal splits
  function triggerSealBurst() {
    const canvas = document.getElementById('envelope-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = waxSeal.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const burstParticles = [];
    const count = 45;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6.5 + 2;
      burstParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3.5 + 1.5,
        alpha: 1,
        color: Math.random() > 0.35 ? '#D4AF37' : '#FFF0C2'
      });
    }

    let frames = 0;
    function animateBurst() {
      frames++;
      for (let i = 0; i < burstParticles.length; i++) {
        const p = burstParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.alpha -= 0.02;

        if (p.alpha > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#D4AF37';
          ctx.fill();
          ctx.restore();
        }
      }

      if (frames < 50) {
        requestAnimationFrame(animateBurst);
      }
    }

    requestAnimationFrame(animateBurst);
  }
});
