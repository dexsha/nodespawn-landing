/* =====================
   NAV — sticky background on scroll
   ===================== */
const nav = document.getElementById('nav');

const handleScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
};

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll(); // run once on load

/* =====================
   HAMBURGER — mobile menu toggle
   ===================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* =====================
   SMOOTH SCROLL — anchor links
   ===================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* =====================
   HERO TYPEWRITER — cycling taglines
   ===================== */
const typewriterTarget = document.querySelector('.hero__headline .accent');
if (typewriterTarget) {
  const words = ['matter.', 'last.', 'scale.', 'count.'];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let paused = false;

  const type = () => {
    const current = words[wordIndex];

    if (paused) {
      paused = false;
      setTimeout(type, 1400);
      return;
    }

    if (!deleting) {
      typewriterTarget.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        paused = true;
        deleting = true;
        setTimeout(type, 80);
        return;
      }
    } else {
      typewriterTarget.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(type, deleting ? 55 : 95);
  };

  // Start after a brief delay
  setTimeout(type, 1000);
}
