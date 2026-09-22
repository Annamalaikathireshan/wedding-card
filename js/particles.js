/**
 * Performant Canvas Gold Sparkle & Bokeh Particles
 * Optimized for 60fps with automatic pause when offscreen
 */

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationFrameId = null;
    this.isRunning = false;
    this.maxParticles = window.innerWidth < 768 ? 25 : 55;

    // Check reduced motion preference
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.prefersReducedMotion) return;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Populate particles
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle());
    }

    // Visibility change listener to save CPU / battery
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.start();
  }

  resize() {
    if (!this.canvas) return;
    this.width = this.canvas.width = this.canvas.parentElement 
      ? this.canvas.parentElement.clientWidth 
      : window.innerWidth;
    this.height = this.canvas.height = this.canvas.parentElement 
      ? this.canvas.parentElement.clientHeight 
      : window.innerHeight;
  }

  createParticle() {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      radius: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -Math.random() * 0.45 - 0.15, // float upwards gently
      alpha: Math.random() * 0.6 + 0.2,
      maxAlpha: Math.random() * 0.65 + 0.3,
      alphaSpeed: Math.random() * 0.015 + 0.005,
      alphaDirection: Math.random() > 0.5 ? 1 : -1,
      // Gold & Champagne tones
      color: Math.random() > 0.3 
        ? 'rgba(212, 175, 55,' 
        : 'rgba(245, 230, 190,'
    };
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  loop() {
    if (!this.isRunning) return;
    this.update();
    this.draw();
    this.animationFrameId = requestAnimationFrame(() => this.loop());
  }

  update() {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Twinkle alpha
      p.alpha += p.alphaSpeed * p.alphaDirection;
      if (p.alpha >= p.maxAlpha) {
        p.alphaDirection = -1;
      } else if (p.alpha <= 0.1) {
        p.alphaDirection = 1;
      }

      // Wrap around bounds
      if (p.y < -10) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.color} ${p.alpha})`;
      this.ctx.shadowBlur = p.radius * 3;
      this.ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
      this.ctx.fill();
      this.ctx.restore();
    }
  }
}

window.ParticleSystem = ParticleSystem;
