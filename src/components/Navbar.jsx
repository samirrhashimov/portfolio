import React from 'react'
import '../styles/navbar.css'
import { TbFileCvFilled } from "react-icons/tb";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar = ({ toggleTheme, isDarkMode }) => {
    return (
        <div className='navbar-wrapper'>
            <div className='navbar'>
                <h1 className='logo'>Samir Hashimov</h1>
                <div className='navbarright'>
                    <div className="navbarLinks">
                        <a className='navbarList' href='#about'>About</a>
                        <a className='navbarList' href='#projects'>Projects</a>
                        <a className='navbarList' href='#contact'>Contact</a>
                    </div>
                    <div className='navbarActions'>
                        <button className='themeToggle' onClick={toggleTheme}>
                            {isDarkMode ? <FiSun className="themeIcon" /> : <FiMoon className="themeIcon" />}
                        </button>
                        <a href='/Samir_Hashimov_CV.docx' download>
                            <button className='cv'><TbFileCvFilled className='cvIcon' /></button>
                        </a>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
