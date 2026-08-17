import { contact } from '../data/content';

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">vengadesh<span>CREATIVE PORTFOLIO</span></div>
        <nav className="footer-social" aria-label="Social links">
          {contact.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.aria}>{s.label}</a>
          ))}
        </nav>
        <button className="back-to-top" type="button" aria-label="Back to top" onClick={toTop}>↑ TOP</button>
      </div>
      <div className="footer-copy">© 2026 vengadesh — CREATIVE PORTFOLIO</div>
    </footer>
  );
}
