import React, { useState } from 'react'
import { TbFileCvFilled } from "react-icons/tb";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from 'react-i18next';
import pp from '../assets/images/samirr.jpg'

const Navbar = ({ toggleTheme, isDarkMode }) => {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const changeLanguage = () => {
        const nextLng = i18n.language === 'en' ? 'az' : 'en';
        i18n.changeLanguage(nextLng);
    };

    return (
        <div className='sticky top-0 left-0 w-full z-[100] bg-bg transition-colors duration-300'>
            <div className='max-w-[1104px] mx-auto py-3 px-5 xl:px-0 flex justify-between items-center border-b-[1.2px] border-border bg-transparent'>
                <a href='/' className='flex items-center gap-[10px] no-underline'>
                    <img src={pp} className='w-[35px] rounded-full'></img>
                    <h1 className='font-[Inter] text-[1.2rem] text-text max-md:text-[1.1rem] font-bold'>Samir Hashimov</h1>
                </a>
                <div className='flex gap-3 items-center'>
                    <div className="flex gap-3 max-[480px]:hidden">
                        <a className='no-underline text-text font-[Inter] text-[0.8rem] border-b border-text py-[3px] transition-colors duration-200 hover:border-section-header hover:text-section-header max-[480px]:text-[0.75rem]' href='/'>{t('navbar.home')}</a>
                        <a className='no-underline text-text font-[Inter] text-[0.8rem] border-b border-text py-[3px] transition-colors duration-200 hover:border-section-header hover:text-section-header max-[480px]:text-[0.75rem]' href='https://samirrhashimov.substack.com/' target="_blank">{t('navbar.blog')}</a>
                        <a className='no-underline text-text font-[Inter] text-[0.8rem] border-b border-text py-[3px] transition-colors duration-200 hover:border-section-header hover:text-section-header max-[480px]:text-[0.75rem]' href='/links'>{t('navbar.social')}</a>
                    </div>
                    <div className='flex gap-2.5 items-center'>
                        <button className='max-[480px]:hidden bg-transparent border border-border text-text p-1.5 rounded-[5px] cursor-pointer flex items-center justify-center font-medium transition-all duration-200 h-[32px] hover:border-border-hover hover:bg-hover-surface text-[0.8rem] min-w-[38px] font-[Inter]' onClick={changeLanguage}>
                            {i18n.language === 'en' ? 'AZ' : 'EN'}
                        </button>
                        <a href='/Samir_Hashimov_CV.pdf' download title="Download CV">
                            <button className='gap-[5px] p-1.5 rounded-[5px] border border-border text-text w-[auto] h-[32px] cursor-pointer flex items-center justify-center hover:border-border-hover hover:bg-hover-surface transition-all duration-300'>
                                <TbFileCvFilled className='w-[18px] h-[18px]' />
                            </button>
                        </a>

                        <button className='max-[480px]:hidden bg-transparent border border-border text-text p-1.5 rounded-[5px] cursor-pointer flex items-center justify-center font-medium transition-all duration-200 h-[32px] hover:border-border-hover hover:bg-hover-surface text-[1.2rem]' onClick={toggleTheme}>
                            {isDarkMode ? <FiSun className="w-[18px] h-[18px]" /> : <FiMoon className="w-[18px] h-[18px]" />}
                        </button>
                        <button className='hidden max-[480px]:flex bg-transparent border border-border text-text p-1.5 rounded-[5px] cursor-pointer items-center justify-center font-medium transition-all duration-200 h-[32px] hover:border-border-hover hover:bg-hover-surface text-[1.2rem]' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <FiX className="w-[18px] h-[18px]" /> : <FiMenu className="w-[18px] h-[18px]" />}
                        </button>
                    </div>
                </div>
            </div>
            <div className={`hidden max-[480px]:flex flex-col items-end px-5 pt-10 border-border bg-bg fixed w-full left-0 top-[60px] h-[calc(100dvh-60px)] shadow-lg z-[90] transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible'}`}>
                <div className='flex flex-col items-end gap-8 w-full'>
                    <a className='no-underline text-text font-[Inter] text-[2.5rem] font-bold transition-colors duration-200 hover:text-section-header' href='/' onClick={() => setIsMenuOpen(false)}>{t('navbar.home')}</a>
                    <a className='no-underline text-text font-[Inter] text-[2.5rem] font-bold transition-colors duration-200 hover:text-section-header' href='https://samirrhashimov.substack.com/' target="_blank" onClick={() => setIsMenuOpen(false)}>{t('navbar.blog')}</a>
                    <a className='no-underline text-text font-[Inter] text-[2.5rem] font-bold transition-colors duration-200 hover:text-section-header' href='/links' onClick={() => setIsMenuOpen(false)}>{t('navbar.social')}</a>
                </div>
                
                <div className='flex gap-4 mt-auto mb-8 w-full justify-end border-t-[1.2px] border-border pt-6'>
                    <button className='bg-transparent border border-border text-text p-2 rounded-[5px] cursor-pointer flex items-center justify-center font-medium transition-all duration-200 h-[38px] hover:border-border-hover hover:bg-hover-surface text-[1rem] min-w-[45px] font-[Inter]' onClick={() => {changeLanguage(); setIsMenuOpen(false);}}>
                        {i18n.language === 'en' ? 'AZ' : 'EN'}
                    </button>
                    <button className='bg-transparent border border-border text-text p-2 rounded-[5px] cursor-pointer flex items-center justify-center font-medium transition-all duration-200 h-[38px] hover:border-border-hover hover:bg-hover-surface text-[1.4rem]' onClick={() => {toggleTheme(); setIsMenuOpen(false);}}>
                        {isDarkMode ? <FiSun className="w-[20px] h-[20px]" /> : <FiMoon className="w-[20px] h-[20px]" />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
