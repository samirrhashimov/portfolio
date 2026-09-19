import React from 'react'
import pp from '../assets/images/samirr.jpg'
import { FaGithub, FaLinkedin, FaInstagram, } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiMedium, SiBuymeacoffee } from "react-icons/si";
import { BiLogoDevTo } from "react-icons/bi";
import edugovazFrontBackend from "../assets/images/certificate/edugovaz-frontbackend.jpg"
import freecodecampResponsiveWeb from "../assets/images/certificate/freecodecamp-responsivewebdesign.png"
import AZ900 from "../assets/images/certificate/AZ-900.png"
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1 className='font-[Inter] text-[1.3rem] mb-2.5 font-bold'>{t('about.bioTitle')}</h1>
            <div className='flex gap-4 pb-[25px] max-md:flex-col'>
                <div className='border-t border-r border-b-[2.5px] border-l-[2.5px] p-4 flex-1 rounded-[12px_0px] bg-card border-t-card-border border-l-card-border border-r-text border-b-text'>
                    <img className='w-[130px] rounded-full' src={pp} alt='Samirr' />
                    <p className='font-[Outfit] text-[16px] my-[5px] text-secondary'>@samirrhashimov</p>
                    <p className='font-[Inter] text-[14px]'>Junior Front-End Developer</p>
                </div>
                <div className='border-t border-r border-b-[2.5px] border-l-[2.5px] p-4 flex-1 text-text font-[Inter] rounded-[12px_0px] bg-card border-t-card-border border-l-card-border border-r-text border-b-text'>
                    <div className='flex flex-col justify-between h-full'>
                        <p className=''>
                            {t('about.bio')}
                        </p>
                        <div className='flex justify-center overflow-hidden'>
                            <img className='max-w-[500px] mt-[12px] max-md:max-w-[300px]' src="https://skillicons.dev/icons?i=html,css,js,react,vite,git,figma,firebase,azure" />
                        </div>
                    </div>

                </div>

            </div>
            <h1 className='font-[Inter] text-[1.3rem] mt-[20px] mb-2.5 font-bold'>{t('about.certificatesTitle')}</h1>
            <div className='grid grid-cols-3 gap-[18px] pb-[20px] max-md:grid-cols-2'>
                <a className='block overflow-hidden border border-card-border bg-card rounded-xl no-underline text-inherit transition-all duration-150 hover:border-text' href='https://learn.microsoft.com/api/credentials/share/en-us/samirrhashimov/ACA552F1F434C6A8?sharingId=CF4D36DF8A903864' target='_blank' rel='noreferrer'>
                    <img className='block w-full aspect-[7/5] object-cover object-center' src={AZ900} alt='Microsoft Azure Fundamentals certificate'></img>
                    <div className='flex min-h-[90px] flex-col justify-center p-[10px] text-center'>
                        <p className='text-[0.95rem] leading-tight font-[Inter] font-bold text-text mb-[3px]'>Microsoft</p>
                        <p className='text-[0.75rem] leading-[1.35] font-[Inter] text-secondary'>Azure Fundamentals (AZ-900)</p>
                    </div>
                </a>
                <a className='block overflow-hidden border border-card-border bg-card rounded-xl no-underline text-inherit transition-all duration-150 hover:border-text' href={edugovazFrontBackend} target='_blank' rel='noreferrer'>
                    <img className='block w-full aspect-[7/5] object-cover object-center' src={edugovazFrontBackend} alt='Front-End and Back-End Developer certificate'></img>
                    <div className='flex min-h-[90px] flex-col justify-center p-[10px] text-center'>
                        <p className='text-[0.95rem] leading-tight font-[Inter] font-bold text-text mb-[3px]'>Bakı Dövlət Peşə Tədris Mərkəzi</p>
                        <p className='text-[0.75rem] leading-[1.35] font-[Inter] text-secondary'>Front-End & Back-End Developer</p>
                    </div>
                </a>
                <a className='block overflow-hidden border border-card-border bg-card rounded-xl no-underline text-inherit transition-all duration-150 hover:border-text' href='https://www.freecodecamp.org/certification/samirrhashimov/responsive-web-design' target='_blank' rel='noreferrer'>
                    <img className='block w-full aspect-[7/5] object-cover object-center' src={freecodecampResponsiveWeb} alt='freeCodeCamp Responsive Web Design certificate'></img>
                    <div className='flex min-h-[90px] flex-col justify-center p-[10px] text-center'>
                        <p className='text-[0.95rem] leading-tight font-[Inter] font-bold text-text mb-[3px]'>freeCodeCamp</p>
                        <p className='text-[0.75rem] leading-[1.35] font-[Inter] text-secondary'>Responsive Web Design</p>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default About
