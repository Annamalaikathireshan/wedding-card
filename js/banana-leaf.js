/**
 * Chettinad Kalyana Virundhu (Banana Leaf Feast) Interactive Menu Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const courseTabs = document.querySelectorAll('.leaf-course-tab');
  const dishCards = document.querySelectorAll('.dish-card');

  if (!courseTabs.length || !dishCards.length) return;

  courseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      courseTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const filter = tab.getAttribute('data-filter');

      dishCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'unfoldBananaLeaf 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

