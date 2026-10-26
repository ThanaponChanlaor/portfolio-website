import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
// import { Contact } from './sections/Contact';
import { Experience } from './sections/Experience';
import { Hero } from './sections/Hero/Hero';
import { Projects } from './sections/Projects';
import { RoleFit } from './sections/RoleFit';
import { Skills } from './sections/Skills';
// import { ThisSite } from './sections/ThisSite';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <main>
        <RoleFit />
        <Experience />
        <Projects />
        <Skills />
        {/* <ThisSite /> */}
        {/* <Contact /> */}
      </main>
      <Footer />
    </>
  );
}

export default App;
