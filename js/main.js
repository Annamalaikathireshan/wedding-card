/**
 * Main Application Orchestrator
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Background Subtle Sparkles
  if (window.ParticleSystem) {
    new window.ParticleSystem('bg-canvas');
  }

  // Header Scroll State & Floating Action Bar
  const header = document.querySelector('.site-header');
  const floatingBar = document.getElementById('floating-action-bar');
  const heroSection = document.getElementById('hero');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header background blur
    if (header) {
      if (scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    // Floating Bar: reveal only after scrolling past hero
    if (floatingBar && heroSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight * 0.6;
      if (scrollY > heroBottom) {
        floatingBar.classList.remove('is-hidden');
      } else {
        floatingBar.classList.add('is-hidden');
      }
    }

    // Update active nav link
    updateActiveNav();
  }, { passive: true });

  // IntersectionObserver for 60fps Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal, .reveal-fade, .reveal-zoom');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // Active Navigation Link Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let currentId = '';
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  // Smooth Scrolling for Internal Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Copy to Clipboard Utility (for IBAN and Addresses)
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(btn.getAttribute('data-toast') || 'Copied to clipboard!');
      }).catch(() => {
        // Fallback
        const temp = document.createElement('textarea');
        temp.value = textToCopy;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast(btn.getAttribute('data-toast') || 'Copied to clipboard!');
      });
    });
  });

  // Toast Notification System
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 400);
    }, 3500);
  }

  window.showToast = showToast;
});
