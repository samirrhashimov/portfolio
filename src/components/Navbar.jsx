import React from 'react'
import { TbFileCvFilled } from "react-icons/tb";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTranslation } from 'react-i18next';
import pp from '../assets/images/samirr.jpg'

const Navbar = ({ toggleTheme, isDarkMode }) => {
    const { t, i18n } = useTranslation();

    const changeLanguage = () => {
        const nextLng = i18n.language === 'en' ? 'az' : 'en';
        i18n.changeLanguage(nextLng);
    };

    return (
        <div className='sticky top-0 left-0 w-full z-[100] bg-bg transition-colors duration-300'>
            <div className='max-w-[1104px] mx-auto py-3 px-5 xl:px-0 flex justify-between items-center border-b-[1.2px] border-border bg-transparent'>
                <div className='flex items-center gap-[10px]'>
                    <img src={pp} className='w-[35px] rounded-full'></img>
                    <h1 className='font-[Inter] text-[1.2rem] text-text max-md:text-[1.1rem] font-bold'>Samir Hashimov</h1>
                </div>
                <div className='flex gap-3 items-center'>
                    <div className="flex gap-3 max-[480px]:hidden">
                        <a className='no-underline text-text font-[Inter] text-[0.8rem] border-b border-text py-[3px] transition-colors duration-200 hover:border-section-header hover:text-section-header max-[480px]:text-[0.75rem]' href='/'>{t('navbar.home')}</a>
                        <a className='no-underline text-text font-[Inter] text-[0.8rem] border-b border-text py-[3px] transition-colors duration-200 hover:border-section-header hover:text-section-header max-[480px]:text-[0.75rem]' href='https://samirrhashimov.substack.com/' target="_blank">{t('navbar.blog')}</a>
                        <a className='no-underline text-text font-[Inter] text-[0.8rem] border-b border-text py-[3px] transition-colors duration-200 hover:border-section-header hover:text-section-header max-[480px]:text-[0.75rem]' href='/links'>{t('navbar.social')}</a>
                    </div>
                    <div className='flex gap-2.5 items-center'>
                        <button className='bg-transparent border border-border text-text p-1.5 rounded-[5px] cursor-pointer flex items-center justify-center font-medium transition-all duration-200 h-[32px] hover:border-[#444] hover:bg-[#111] text-[0.8rem] min-w-[38px] font-[Inter]' onClick={changeLanguage}>
                            {i18n.language === 'en' ? 'AZ' : 'EN'}
                        </button>
                        <button className='bg-transparent border border-border text-text p-1.5 rounded-[5px] cursor-pointer flex items-center justify-center font-medium transition-all duration-200 h-[32px] hover:border-[#444] hover:bg-[#111] text-[1.2rem]' onClick={toggleTheme}>
                            {isDarkMode ? <FiSun className="w-[18px] h-[18px]" /> : <FiMoon className="w-[18px] h-[18px]" />}
                        </button>

                        <a href='/Samir_Hashimov_CV.pdf' download title="Download CV">
                            <button className='gap-[5px] p-1.5 rounded-[5px] border border-border text-[#fff] w-[auto] h-[32px] cursor-pointer flex items-center justify-center hover:border-[#444] hover:bg-[#111] transition-all duration-300'>
                                <TbFileCvFilled className='w-[18px] h-[18px]' />
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
