import { useEffect, useRef } from 'react';
import { useBodyClass } from '../hooks/useBodyClass';

// Project detail modal. Rendered conditionally by App (mounts when a project is
// selected, unmounts on close). Scroll-lock + Esc/backdrop close + basic focus
// management are handled here.
export default function ProjectModal({ project, onClose }) {
  const open = !!project;
  const cardRef = useRef(null);
  const lastFocused = useRef(null);
  useBodyClass('modal-open', open);

  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement;
      if (cardRef.current) cardRef.current.focus();
    } else if (lastFocused.current && lastFocused.current.focus) {
      lastFocused.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && open) onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal"
      id="project-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pm-title"
      ref={cardRef}
      tabIndex={-1}
    >
      <div className="modal-backdrop" data-close onClick={onClose} />
      <div className="modal-card" role="document">
        <button className="modal-close" type="button" data-close aria-label="Close" onClick={onClose}>×</button>
        <div className={'modal-thumb ' + project.thumb}>{project.title.split(' ')[0]}</div>
        <div className="modal-cat">{project.category}</div>
        <h3 id="pm-title">{project.title}</h3>
        <p id="pm-desc">{project.desc}</p>
        <a className="pill" href={project.link} target="_blank" rel="noopener">VIEW PROJECT →</a>
      </div>
    </div>
  );
}
