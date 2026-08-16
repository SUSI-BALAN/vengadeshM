import { useEffect } from 'react';

// Scroll-spy: highlight the nav link for the section currently in view.
// `navRef` is the <nav> element containing the anchor links.
export function useScrollSpy(navRef) {
  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return undefined;

    const spyLinks = navEl.querySelectorAll('a');
    if (!('IntersectionObserver' in window) || !spyLinks.length) return undefined;

    const spySections = document.querySelectorAll('main section[id]');
    const spyIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            spyLinks.forEach((l) => l.classList.remove('active'));
            const link = navEl.querySelector('a[href="#' + en.target.id + '"]');
            if (link) link.classList.add('active');
          }
        });
      },
      { threshold: 0.5, rootMargin: '-20% 0px -40% 0px' }
    );

    spySections.forEach((s) => spyIO.observe(s));
    return () => spyIO.disconnect();
  }, [navRef]);
}
