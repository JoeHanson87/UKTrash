document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const yearSpan = document.getElementById('year');

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const header = document.querySelector('.site-header');
  const shrinkThreshold = 50;

  if (header) {
    const updateHeaderShrink = () => {
      if (window.scrollY > shrinkThreshold) {
        header.classList.add('shrink');
      } else {
        header.classList.remove('shrink');
      }
    };

    updateHeaderShrink();
    window.addEventListener('scroll', updateHeaderShrink, { passive: true });
  }

  // Ensure only one service accordion item is open at a time
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        accordionItems.forEach((other) => {
          if (other !== item && other.open) {
            other.open = false;
          }
        });
      }
    });
  });

  // Scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }
});
