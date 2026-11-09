/**
 * Chettinad Heritage Mansion Interactive Experience Controller
 * Orchestrates the 3D Walkthrough:
 * 1. Landing Envelope Unboxing -> 2. Mukappu Vaasal Double Door Open -> 3. Mutram Hub & 4 Pillars
 */

document.addEventListener('DOMContentLoaded', () => {
  const landingOverlay = document.getElementById('chettinad-landing-overlay');
  const envelope = document.getElementById('chettinad-envelope');
  const waxSeal = document.getElementById('chettinad-wax-seal');
  const landingSkipBtn = document.getElementById('landing-skip-btn');
  const replayWalkthroughBtns = document.querySelectorAll('.replay-walkthrough-btn');

  // Mukappu Vaasal Door Elements
  const doorWrapper = document.getElementById('door-frame-wrapper');
  const doorOpenBtn = document.getElementById('door-open-btn');
  const enterMutramBtn = document.getElementById('enter-mutram-btn');
  const doorLeafLeft = document.querySelector('.door-leaf-left');
  const doorLeafRight = document.querySelector('.door-leaf-right');

  // Interactive Navigation Pillar links
  const pillarCards = document.querySelectorAll('.pillar-portal-card');

  // 1. Landing Envelope Interaction
  function openEnvelope() {
    if (!envelope || envelope.classList.contains('is-opened')) return;

    envelope.classList.add('is-opened');

    // Trigger golden akshata & sparkle burst at wax seal position
    triggerSealAkshataBurst();

    // Start background audio if not yet playing
    if (window.carnaticAudio && !window.carnaticAudio.isPlaying && !window.carnaticAudio.isMuted) {
      window.carnaticAudio.start();
    }

    // Mark as experienced in session storage
    sessionStorage.setItem('chettinad_walkthrough_opened', 'true');

    // 3D Camera Glide from Envelope to Mukappu Vaasal
    setTimeout(() => {
      landingOverlay.classList.add('is-hidden');
      const entranceEl = document.getElementById('mukappu-vaasal');
      if (entranceEl) {
        entranceEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 1400);
  }

  function skipToCourtyard() {
    if (landingOverlay) {
      landingOverlay.classList.add('is-hidden');
    }
    sessionStorage.setItem('chettinad_walkthrough_opened', 'true');
    const mutramEl = document.getElementById('mutram');
    if (mutramEl) {
      mutramEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Start audio softly
    if (window.carnaticAudio && !window.carnaticAudio.isPlaying) {
      window.carnaticAudio.start();
    }
  }

  function replayWalkthrough() {
    if (landingOverlay) {
      landingOverlay.classList.remove('is-hidden');
    }
    if (envelope) {
      envelope.classList.remove('is-opened');
    }
    if (doorWrapper) {
      doorWrapper.classList.remove('doors-open');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (waxSeal) {
    waxSeal.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelope();
    });
  }

  if (envelope) {
    envelope.addEventListener('click', () => {
      openEnvelope();
    });
    envelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  if (landingSkipBtn) {
    landingSkipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      skipToCourtyard();
    });
  }

  replayWalkthroughBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      replayWalkthrough();
    });
  });

  // Check session storage
  if (sessionStorage.getItem('chettinad_walkthrough_opened') === 'true') {
    if (landingOverlay) {
      landingOverlay.classList.add('is-hidden');
    }
  }

  // 2. Mukappu Vaasal Carved Teakwood Door Swing
  function openTeakwoodDoors() {
    if (!doorWrapper || doorWrapper.classList.contains('doors-open')) return;

    doorWrapper.classList.add('doors-open');

    // Trigger auspicious chime or veena pluck
    if (window.carnaticAudio && window.carnaticAudio.ensureContext) {
      window.carnaticAudio.pluckVeena(523.25, 3.0); // High Sa bell tone
    }

    // After doors swing open, highlight the couple motion reveal and smooth glide
    setTimeout(() => {
      const thinnaiReveal = document.getElementById('thinnai-reveal');
      if (thinnaiReveal) {
        thinnaiReveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 1200);
  }

  if (doorOpenBtn) {
    doorOpenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openTeakwoodDoors();
    });
  }

  if (doorLeafLeft) {
    doorLeafLeft.addEventListener('click', () => openTeakwoodDoors());
  }
  if (doorLeafRight) {
    doorLeafRight.addEventListener('click', () => openTeakwoodDoors());
  }

  if (enterMutramBtn) {
    enterMutramBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const mutram = document.getElementById('mutram');
      if (mutram) {
        mutram.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // 3. Central Courtyard (Mutram) Interactive Navigation Pillars
  pillarCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const targetId = card.getAttribute('data-target');
      if (!targetId) return;

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();

        // If target is Virundhu Koodam (Banana Leaf Menu), trigger unfold animation
        if (targetId === 'virundhu-koodam') {
          const leaf = document.querySelector('.leaf-wrapper');
          if (leaf) {
            leaf.classList.remove('banana-leaf-unfold');
            void leaf.offsetWidth; // Trigger reflow
            leaf.classList.add('banana-leaf-unfold');
          }
        }

        // If target is Vazhikaatti (Parchment Map), trigger unroll animation
        if (targetId === 'vazhikaatti') {
          const parchment = document.querySelector('.parchment-scroll-container');
          if (parchment) {
            parchment.classList.remove('parchment-unroll');
            void parchment.offsetWidth;
            parchment.classList.add('parchment-unroll');
          }
        }

        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Sparkle burst helper when seal is cracked
  function triggerSealAkshataBurst() {
    const canvas = document.getElementById('landing-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rect = waxSeal ? waxSeal.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const particles = [];
    const colors = ['#FED65B', '#D4AF37', '#B83A24', '#FFFFFF', '#F59E0B'];

    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 8;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        radius: 2 + Math.random() * 3.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: 0.015 + Math.random() * 0.02
      });
    }

    function animateBurst() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        if (p.alpha > 0) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.12; // gravity
          p.alpha -= p.decay;

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      if (alive) {
        requestAnimationFrame(animateBurst);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    requestAnimationFrame(animateBurst);
  }
});

