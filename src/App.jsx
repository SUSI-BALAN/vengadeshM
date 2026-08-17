import { useState } from 'react';
import Background from './components/Background';
import Loader from './components/Loader';
import Topbar from './components/Topbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Quote from './components/Quote';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const reducedMotion = useReducedMotion();
  const [openProject, setOpenProject] = useState(null);

  // Sets up scroll-reveal on the content (runs once after first paint).
  useScrollReveal();

  return (
    <>
      <Background reducedMotion={reducedMotion} />
      <Loader />
      <div id="progress" aria-hidden="true" />
      <Topbar />

      <main>
        <Hero />
        <Projects onOpen={setOpenProject} />
        <About />
        <Quote />
        <Contact />
      </main>

      <Footer />

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </>
  );
}
