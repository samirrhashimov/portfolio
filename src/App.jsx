import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import './index.css'
import About from './components/About'
import SectionHeader from './components/SectionHeader'
import Projects from './components/Projects'
import Spacer from './components/Spacer'
import Volunteering from './components/Volunteering'
import Contact from './components/Contact'

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
      <div className='container'>
        <div id='about'>
          <SectionHeader text="About"/>
        </div>
        <About/>
        <Spacer height={50}/>
        <div id='projects'>
          <SectionHeader text="Projects"/>
        </div>
        <Projects/>
        <Spacer height={50}/>
        <div id='volunteering'>
          <SectionHeader text="Community"/>
        </div>
        <Volunteering/>
        <Spacer height={50}/>
        <div id='contact'>
          <SectionHeader text="Contact"/>
        </div>
        <Contact/>
      </div>
    </>
  )
}

export default App
