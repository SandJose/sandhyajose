document.getElementById('yr').textContent = new Date().getFullYear();

// Highlight the nav link for the section currently in view
const links = document.querySelectorAll('.bar nav a');
const targets = ['top', 'research', 'publications', 'contact']
  .map(id => document.getElementById(id));

const seen = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

targets.forEach(t => t && seen.observe(t));
