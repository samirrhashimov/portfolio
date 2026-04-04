import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import './index.css'
import About from './components/About'
import SectionHeader from './components/SectionHeader'
import Projects from './components/Projects'
import Spacer from './components/Spacer'

function App() {


  return (
    <>
      <Navbar />
      <div className='container'>
        <SectionHeader text="About"/>
        <About />
        <Spacer height={50}/>
        <SectionHeader text="Projects"/>
        <Projects/>
      </div>
    </>
  )
}

export default App
