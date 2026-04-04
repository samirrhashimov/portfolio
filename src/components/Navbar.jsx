import React from 'react'
import '../styles/navbar.css'
import { TbFileCvFilled } from "react-icons/tb";

const Navbar = () => {
    return (
        <div className='navbar-wrapper'>
            <div className='navbar'>
            <h1 className='logo'>Samir Hashimov</h1>
            <div className='navbarright'>
                <a className='navbarList' href='#about'>About</a>
                <a className='navbarList' href='#projects'>Projects</a>
                <a className='navbarList' href='#contact'>Contact</a>
                <a href='../assets/files/Samir_Hashimov_CV.docx' download>
                <button className='cv'><TbFileCvFilled className='cvIcon'/></button>
                </a>
            </div>
            </div>
        </div>
    )
}

export default Navbar
