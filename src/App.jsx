import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import './index.css'
import About from './components/About'
import Projects from './components/Projects'
import Spacer from './components/Spacer'
import Community from './components/Community'
import Links from './components/Links'
import FadeInSection from './components/FadeInSection'

// Home Page Component
function Home() {
  return (
    <div className='max-w-[1200px] mx-auto px-12 md:max-[768px]:px-5 max-md:px-5'>
      <FadeInSection>
        <div id='about' className='scroll-mt-[100px]'>
          <About/>
        </div>
      </FadeInSection>
      
      <Spacer height={50}/>
      
      <FadeInSection>
        <div id='projects' className='scroll-mt-[100px]'>
          <Projects/>
        </div>
      </FadeInSection>
      
      <Spacer height={50}/>
      
      <FadeInSection>
        <div id='community' className='scroll-mt-[100px]'>
          <Community/>
        </div>
      </FadeInSection>
      
      <Spacer height={50}/>
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const root = document.documentElement;

    const updateGlowPosition = (event) => {
      root.style.setProperty('--cursor-x', `${event.clientX}px`);
      root.style.setProperty('--cursor-y', `${event.clientY}px`);
      root.style.setProperty('--cursor-glow-opacity', '1');
    };

    const hideGlow = () => {
      root.style.setProperty('--cursor-glow-opacity', '0');
    };

    window.addEventListener('pointermove', updateGlowPosition, { passive: true });
    window.addEventListener('pointerleave', hideGlow);

    return () => {
      window.removeEventListener('pointermove', updateGlowPosition);
      window.removeEventListener('pointerleave', hideGlow);
    };
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <>
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/links" element={<Links />} />
      </Routes>
    </>
  )
}

export default App