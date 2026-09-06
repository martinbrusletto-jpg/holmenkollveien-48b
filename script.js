const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
const parallax = document.querySelector('[data-parallax]');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 12);
  if (parallax && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    parallax.style.transform = `translate3d(0, ${Math.min(y * 0.22, 140)}px, 0)`;
  }
}, { passive: true });

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });

document.querySelectorAll('.reveal, .reveal-item').forEach((el) => io.observe(el));
