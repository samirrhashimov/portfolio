import React from 'react'
import '../styles/navbar.css'
import { TbFileCvFilled } from "react-icons/tb";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTranslation } from 'react-i18next';

const Navbar = ({ toggleTheme, isDarkMode }) => {
    const { t, i18n } = useTranslation();

    const changeLanguage = () => {
        const nextLng = i18n.language === 'en' ? 'az' : 'en';
        i18n.changeLanguage(nextLng);
    };

    return (
        <div className='navbar-wrapper'>
            <div className='navbar'>
                <h1 className='logo'>Samir Hashimov</h1>
                <div className='navbarright'>
                    <div className="navbarLinks">
                        <a className='navbarList' href='#about'>{t('navbar.about')}</a>
                        <a className='navbarList' href='#projects'>{t('navbar.projects')}</a>
                        <a className='navbarList' href='#contact'>{t('navbar.contact')}</a>
                    </div>
                    <div className='navbarActions'>
                        <button className='langToggle' onClick={changeLanguage}>
                            {i18n.language === 'en' ? 'AZ' : 'EN'}
                        </button>
                        <button className='themeToggle' onClick={toggleTheme}>
                            {isDarkMode ? <FiSun className="themeIcon" /> : <FiMoon className="themeIcon" />}
                        </button>

                        <a href='/Samir_Hashimov_CV.docx' download title="Download CV">
                            <button className='cv'><TbFileCvFilled className='cvIcon' /></button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
