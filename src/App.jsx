import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import './index.css'
import About from './components/About'
import SectionHeader from './components/SectionHeader'
import Projects from './components/Projects'
import Spacer from './components/Spacer'
import Community from './components/Community'
import Links from './components/Links'
import { useTranslation } from 'react-i18next'
import FadeInSection from './components/FadeInSection'

// Home Page Component
function Home() {
  const { t } = useTranslation();

  return (
    <div className='max-w-[1200px] mx-auto px-12 md:max-[768px]:px-5 max-md:px-5'>
      <FadeInSection>
        <div id='about' className='scroll-mt-[100px]'>
          <SectionHeader text={t('sections.about')}/>
        </div>
        <About/>
      </FadeInSection>
      
      <Spacer height={50}/>
      
      <FadeInSection>
        <div id='projects' className='scroll-mt-[100px]'>
          <SectionHeader text={t('sections.projects')}/>
        </div>
        <Projects/>
      </FadeInSection>
      
      <Spacer height={50}/>
      
      <FadeInSection>
        <div id='community' className='scroll-mt-[100px]'>
          <SectionHeader text={t('sections.community')}/>
        </div>
        <Community/>
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