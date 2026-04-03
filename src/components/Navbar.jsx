import React from 'react'
import '../styles/navbar.css'

const Navbar = () => {
    return (
        <div>
            <div className='navbar'>
                <h1 className='logo'>Samir Hashimov</h1>
                <div className='navbarright'>
                    <a className='navbarList' href=''>About</a>
                    <a className='navbarList' href=''>Projects</a>
                    <a className='navbarList' href=''>Contact</a>
                    <a href='../assets/files/Samir_Hasimov_CV.docx' download>
                    <button className='cv'>Resume</button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Navbar
