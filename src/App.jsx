import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import './index.css'
import About from './components/About'
import SectionHeader from './components/SectionHeader'
import Projects from './components/Projects'
import Spacer from './components/Spacer'
import Volunteering from './components/Volunteering'

function App() {


  return (
    <>
      <Navbar />
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
      </div>
    </>
  )
}

export default App
