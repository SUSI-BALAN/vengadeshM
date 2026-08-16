import { useEffect, useRef, useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useBodyClass } from '../hooks/useBodyClass';

const LINKS = [
  { href: '#projects', label: 'WORK' },
  { href: '#about', label: 'ABOUT' },
  { href: '#contact', label: 'CONTACT' },
];

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  useScrollSpy(navRef);
  useBodyClass('menu-open', menuOpen);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    const onResize = () => { if (window.innerWidth > 760) setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <header className="topbar">
      <div className="left">CREATIVE PORTFOLIO</div>
      <button
        className="nav-toggle"
        type="button"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        aria-controls="primary-nav"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span /><span /><span />
      </button>
      <nav className={'nav' + (menuOpen ? ' open' : '')} id="primary-nav" ref={navRef}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
      </nav>
    </header>
  );
}
