import { contact } from '../data/content';

export default function Contact() {
  const phoneTel = 'tel:' + contact.phone.replace(/\s/g, '');
  const siteDisplay = contact.site.replace(/^https?:\/\//, '');
  return (
    <section id="contact" aria-label="Contact">
      <div className="grid">
        <div>
          <h2>LET'S WORK<br />TOGETHER <span className="accent">+</span></h2>
          <p>
            I'm currently open for new projects and collaborations.
            Let's create something amazing that drives results.
          </p>
          <a className="pill" href={'mailto:' + contact.email}>● AVAILABLE FOR FREELANCE</a>
        </div>
        <div className="contact-list">
          <a className="contact-item" href={'mailto:' + contact.email}>
            <span className="ico">✉</span><span>{contact.email}</span>
          </a>
          <a className="contact-item" href={contact.site} target="_blank" rel="noopener">
            <span className="ico">⌬</span><span>{siteDisplay}</span>
          </a>
          <a className="contact-item" href={phoneTel}>
            <span className="ico">☎</span><span>{contact.phone}</span>
          </a>
          <div className="contact-item">
            <span className="ico">◎</span><span>{contact.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
