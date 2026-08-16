import { useState } from 'react';
import { projects } from '../data/content';

const FILTERS = [
  { cat: 'all', label: 'All' },
  { cat: 'ecommerce', label: 'E-Commerce' },
  { cat: 'furniture', label: 'Furniture' },
  { cat: 'fashion', label: 'Fashion' },
  { cat: 'web', label: 'Web Design' },
];

export default function Projects({ onOpen }) {
  const [filter, setFilter] = useState('all');
  const matches = (tags) => filter === 'all' || tags.includes(filter);

  return (
    <section id="projects" aria-label="Selected Projects">
      <div className="head">
        <h2>SELECTED PROJECTS</h2>
        <span className="view">VIEW ALL PROJECTS →</span>
      </div>

      <div className="project-filters">
        {FILTERS.map((f) => (
          <button
            key={f.cat}
            type="button"
            className={'proj-filter' + (filter === f.cat ? ' active' : '')}
            data-cat={f.cat}
            onClick={() => setFilter(f.cat)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid-3">
        {projects.map((p, i) => (
          <a
            key={p.id}
            className="project"
            href={p.link}
            target="_blank"
            rel="noopener"
            data-category={p.tags.join(' ')}
            hidden={!matches(p.tags)}
            onClick={(e) => { e.preventDefault(); onOpen(p); }}
          >
            <div className={'thumb ' + p.thumb}>{p.title.split(' ')[0]}</div>
            <p className="proj-desc">{p.desc}</p>
            <div className="meta">
              <span className="ttl">{p.title}</span>
              <span className="cat">{p.category}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="proj-row">
        {projects.map((p, i) => (
          <a
            key={p.id}
            className="proj-item"
            href={p.link}
            target="_blank"
            rel="noopener"
            data-category={p.tags.join(' ')}
            hidden={!matches(p.tags)}
            onClick={(e) => { e.preventDefault(); onOpen(p); }}
          >
            <span className="idx">{String(i + 1).padStart(2, '0')}</span>
            <div className="info">
              <div className="n">{p.title}</div>
              <div className="c">{p.category}</div>
            </div>
            <span className="arrow">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
