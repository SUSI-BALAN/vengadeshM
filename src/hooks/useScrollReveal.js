import { useEffect } from 'react';

// Scroll-reveal: fade/slide content in as it enters the viewport.
// Mirrors the original selector set; adds `.reveal` then observes. Falls back
// to immediately showing everything when IntersectionObserver is unavailable,
// or (via CSS) when the user prefers reduced motion.
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(
      'h2, h3, .hero-bio p, .project, .proj-item, .edu-block, .skills, .process, ' +
        '#quote blockquote, #contact p, .pill, .contact-item'
    );
    if (!els.length) return undefined;

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    els.forEach((el) => {
      el.classList.add('reveal');
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);
}
