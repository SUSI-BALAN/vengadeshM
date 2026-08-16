import { hero } from '../data/content';
import Particles from './Particles';

export default function Hero() {
  return (
    <section id="hero" aria-label="Hero">
      <Particles />
      <div className="hello-panel">
        <span className="glitch-light" data-text={hero.name}>{hero.name}</span>
      </div>
      <div className="hero-bio">
        <p>{hero.bio}</p>
      </div>
    </section>
  );
}
