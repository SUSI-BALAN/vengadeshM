import { useEffect, useRef, useState } from 'react';
import { skills, education, process } from '../data/content';

const SKILL_FILTERS = [
  { cat: 'all', label: 'All' },
  { cat: 'design', label: 'Design' },
  { cat: 'dev', label: 'Dev' },
  { cat: 'tools', label: 'Tools' },
];

export default function About() {
  const skillsRootRef = useRef(null);
  const [skillFilter, setSkillFilter] = useState('all');

  // Fill the proficiency bars when the skills block scrolls into view.
  useEffect(() => {
    const root = skillsRootRef.current;
    if (!root) return undefined;
    const fillBars = (r) => {
      r.querySelectorAll('.bar-fill').forEach((el) => {
        el.style.width = (el.getAttribute('data-level') || '0') + '%';
      });
    };
    if (!('IntersectionObserver' in window)) { fillBars(root); return undefined; }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { fillBars(en.target); io.unobserve(en.target); }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const showGroup = (cat) => skillFilter === 'all' || cat === skillFilter;

  return (
    <section id="about" aria-label="Education, Skills and Process">
      <div className="grid-2">
        <div>
          <h3>EDUCATION &amp; SKILLS</h3>
          <div className="edu-block">
            <div className="section-label">Education</div>
            {education.map((e) => (
              <div className="edu-item" key={e.title}>
                <div>
                  <div className="ttl">{e.title}</div>
                  <div className="sub">{e.sub}</div>
                </div>
                <div className="yr">{e.yr}</div>
              </div>
            ))}
          </div>

          <div className="edu-block" id="skills" ref={skillsRootRef}>
            <div className="section-label">Skills</div>
            <div className="skill-filters">
              {SKILL_FILTERS.map((f) => (
                <button
                  key={f.cat}
                  type="button"
                  className={'skill-filter' + (skillFilter === f.cat ? ' active' : '')}
                  data-cat={f.cat}
                  onClick={() => setSkillFilter(f.cat)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {Object.entries(skills).map(([cat, rows]) => (
              <div className="skill-group" data-category={cat} key={cat} hidden={!showGroup(cat)}>
                {rows.map(([name, level]) => (
                  <div className="skill-row" key={name}>
                    <span className="skill-name">{name}</span>
                    <span className="bar"><span className="bar-fill" data-level={level} /></span>
                    <span className="skill-pct">{level}%</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3>WORK PROCESS</h3>
          <ul className="process">
            {process.map((step) => (
              <li key={step.n}>
                <span className="n">{step.n}</span>
                <span className="ico">{step.ico}</span>
                <div>
                  <div className="step-title">{step.title}</div>
                  <div className="step-desc">{step.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
