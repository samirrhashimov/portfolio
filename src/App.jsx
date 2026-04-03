import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import './index.css'
import About from './components/About'
import SectionHeader from './components/SectionHeader'

function App() {


  return (
    <>
      <div className='container'>
        <Navbar />
        <SectionHeader text="About"/>
        <About />
      </div>
    </>
  )
}

export default App
