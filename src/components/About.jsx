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
            <h1 className='font-[Inter] text-[1.3rem] mb-2.5 font-bold'>{t('about.certificatesTitle')}</h1>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-[18px] pb-[20px] max-md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
                <a className='flex flex-row border border-card-border bg-card rounded-[0_10px_10px_0] overflow-hidden no-underline text-inherit transition-all duration-150 hover:border-text max-md:flex-col max-md:rounded-[10px] max-md:items-center max-md:text-center' href='https://learn.microsoft.com/api/credentials/share/en-us/samirrhashimov/ACA552F1F434C6A8?sharingId=CF4D36DF8A903864' target='_blank' rel='noreferrer'>
                    <img className='w-[250px] h-[150px] object-cover shrink-0' src={AZ900}></img>
                    <div className='mx-[10px] relative w-full max-md:my-[10px] max-md:px-[10px] max-md:pb-[10px]'>
                        <p className='text-[1rem] font-[Inter] font-bold mt-[5px]'>Microsoft</p>
                        <p className='text-[0.9rem] font-[Inter] text-secondary mt-[5px]'>Azure Fundamentals (AZ-900)</p>
                        <div className='certificate-tags absolute bottom-[15px] flex flex-row gap-[5px] overflow-auto w-full max-md:static max-md:mt-[10px] max-md:justify-center'>
                            <p className='bg-badge border border-badge-border text-text rounded-[4px] py-[6px] px-[10px] text-[0.7rem] font-[Inter] whitespace-nowrap'>Azure</p>
                            <p className='bg-badge border border-badge-border text-text rounded-[4px] py-[6px] px-[10px] text-[0.7rem] font-[Inter] whitespace-nowrap'>Cloud Computing</p>
                            <p className='bg-badge border border-badge-border text-text rounded-[4px] py-[6px] px-[10px] text-[0.7rem] font-[Inter] whitespace-nowrap'>ARM</p>
                        </div>
                    </div>
                </a>
                <a className='flex flex-row border border-card-border bg-card rounded-[0_10px_10px_0] overflow-hidden no-underline text-inherit transition-all duration-150 hover:border-text max-md:flex-col max-md:rounded-[10px] max-md:items-center max-md:text-center' href={edugovazFrontBackend} target='_blank' rel='noreferrer'>
                    <img className='w-[250px] h-[150px] object-cover shrink-0' src={edugovazFrontBackend}></img>
                    <div className='mx-[10px] relative w-full max-md:my-[10px] max-md:px-[10px] max-md:pb-[10px]'>
                        <p className='text-[1rem] font-[Inter] font-bold mt-[5px]'>Bakı Dövlət Peşə Tədris Mərkəzi</p>
                        <p className='text-[0.9rem] font-[Inter] text-secondary mt-[5px]'>Front-End & Back-End Developer</p>
                        <div className='certificate-tags absolute bottom-[15px] flex flex-row gap-[5px] overflow-auto w-full max-md:static max-md:mt-[10px] max-md:justify-center'>
                            <p className='bg-badge border border-badge-border text-text rounded-[4px] py-[6px] px-[10px] text-[0.7rem] font-[Inter] whitespace-nowrap'>HTML5</p>
                            <p className='bg-badge border border-badge-border text-text rounded-[4px] py-[6px] px-[10px] text-[0.7rem] font-[Inter] whitespace-nowrap'>CSS3</p>
                            <p className='bg-badge border border-badge-border text-text rounded-[4px] py-[6px] px-[10px] text-[0.7rem] font-[Inter] whitespace-nowrap'>JS</p>
                            <p className='bg-badge border border-badge-border text-text rounded-[4px] py-[6px] px-[10px] text-[0.7rem] font-[Inter] whitespace-nowrap'>React</p>
                            <p className='bg-badge border border-badge-border text-text rounded-[4px] py-[6px] px-[10px] text-[0.7rem] font-[Inter] whitespace-nowrap'>Node.js</p>
                        </div>
                    </div>
                </a>
                <a className='flex flex-row border border-card-border bg-card rounded-[0_10px_10px_0] overflow-hidden no-underline text-inherit transition-all duration-150 hover:border-text max-md:flex-col max-md:rounded-[10px] max-md:items-center max-md:text-center' href='https://www.freecodecamp.org/certification/samirrhashimov/responsive-web-design' target='_blank' rel='noreferrer'>
                    <img className='w-[250px] h-[150px] object-cover shrink-0' src={freecodecampResponsiveWeb}></img>
                    <div className='mx-[10px] relative w-full max-md:my-[10px] max-md:px-[10px] max-md:pb-[10px]'>
                        <p className='text-[1rem] font-[Inter] font-bold mt-[5px]'>freeCodeCamp</p>
                        <p className='text-[0.9rem] font-[Inter] text-secondary mt-[5px]'>Responsive Web Design</p>
                        <div className='certificate-tags absolute bottom-[15px] flex flex-row gap-[5px] overflow-auto w-full max-md:static max-md:mt-[10px] max-md:justify-center'>
                            <p className='bg-badge border border-badge-border text-text rounded-[4px] py-[6px] px-[10px] text-[0.7rem] font-[Inter] whitespace-nowrap'>HTML5</p>
                            <p className='bg-badge border border-badge-border text-text rounded-[4px] py-[6px] px-[10px] text-[0.7rem] font-[Inter] whitespace-nowrap'>CSS3</p>
                            <p className='bg-badge border border-badge-border text-text rounded-[4px] py-[6px] px-[10px] text-[0.7rem] font-[Inter] whitespace-nowrap'>JS</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default About
