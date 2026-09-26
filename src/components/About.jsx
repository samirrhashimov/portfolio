import React, { useState } from 'react'
import pp from '../assets/images/samirr.jpg'
import { FaGithub, FaLinkedin, FaInstagram, FaMicrosoft } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiMedium, SiBuymeacoffee, SiHtml5, SiCss, SiJavascript, SiReact, SiVite, SiFigma, SiFirebase, SiVercel, SiNetlify, SiGit } from "react-icons/si";
import { BiLogoDevTo } from "react-icons/bi";
import edugovazFrontBackend from "../assets/images/certificate/edugovaz-frontbackend.jpg"
import freecodecampResponsiveWeb from "../assets/images/certificate/freecodecamp-responsivewebdesign.png"
import AZ900 from "../assets/images/certificate/AZ-900.png"
import { useTranslation } from 'react-i18next';

const technologyGroups = [
    {
        titleKey: 'about.technologyGroups.webDevelopment',
        skills: [
            { name: 'HTML5', icon: SiHtml5 },
            { name: 'CSS3', icon: SiCss },
            { name: 'JavaScript (ES6+)', icon: SiJavascript },
            { name: 'React + Vite', icon: SiReact },
        ],
    },
    {
        titleKey: 'about.technologyGroups.designTools',
        skills: [
            { name: 'Figma', icon: SiFigma },
            { name: 'Git', icon: SiGit },
        ],
    },
    {
        titleKey: 'about.technologyGroups.cloudDevOps',
        skills: [
            { name: 'Microsoft Azure', icon: FaMicrosoft },
            { name: 'Firebase', icon: SiFirebase },
            { name: 'Vercel', icon: SiVercel },
            { name: 'Netlify', icon: SiNetlify },
        ],
    },
]

const certificates = [
    {
        title: 'Microsoft',
        subtitle: 'Azure Fundamentals (AZ-900)',
        image: AZ900,
        alt: 'Microsoft Azure Fundamentals certificate',
        link: 'https://learn.microsoft.com/api/credentials/share/en-us/samirrhashimov/ACA552F1F434C6A8?sharingId=CF4D36DF8A903864'
    },
    {
        title: 'Bakı Dövlət Peşə Tədris Mərkəzi',
        subtitle: 'Front-End & Back-End Developer',
        image: edugovazFrontBackend,
        alt: 'Front-End and Back-End Developer certificate',
        link: edugovazFrontBackend
    },
    {
        title: 'freeCodeCamp',
        subtitle: 'Responsive Web Design',
        image: freecodecampResponsiveWeb,
        alt: 'freeCodeCamp Responsive Web Design certificate',
        link: 'https://www.freecodecamp.org/certification/samirrhashimov/responsive-web-design'
    }
]

const About = () => {
    const { t } = useTranslation();
    const [showAllCertificates, setShowAllCertificates] = useState(false);

    return (
        <div>
            <h1 className='font-[Inter] text-[1.3rem] mt-[20px] mb-2.5 font-bold'>{t('about.bioTitle')}</h1>
            <div className='flex gap-4 pb-[25px] max-md:flex-col'>
                <div className='border border-card-border p-4 flex-1 rounded-xl bg-card'>
                    <img className='w-[130px] rounded-full' src={pp} alt='Samirr' />
                    <p className='font-[Outfit] text-[16px] my-[5px] text-secondary'>@samirrhashimov</p>
                    <p className='font-[Inter] text-[14px]'>Junior Front-End Developer</p>
                </div>
                <div className='border border-card-border p-4 flex-1 text-text font-[Inter] rounded-xl bg-card'>
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
            <div className='flex items-center justify-between gap-4 mt-[20px] mb-2.5'>
                <h1 className='font-[Inter] text-[1.3rem] m-0 font-bold'>{t('about.certificatesTitle')}</h1>
                {certificates.length > 2 && (
                    <button type='button' className={`inline-flex items-center gap-[3px] border border-card-border bg-card text-text rounded-[6px] px-[12px] py-[8px] font-[Inter] text-[12px] cursor-pointer hover:border-border-hover hover:bg-hover-surface ${certificates.length <= 4 ? 'max-md:inline-flex md:hidden' : ''}`} onClick={() => setShowAllCertificates(current => !current)}>
                        {showAllCertificates ? t('projects.showLess') : t('projects.showMore')}
                        <span aria-hidden='true' className='ml-[6px]'>{showAllCertificates ? '←' : '→'}</span>
                    </button>
                )}
            </div>
            <div className='grid grid-cols-4 gap-[18px] pb-[20px] max-md:grid-cols-2'>
                {certificates.map((cert, index) => (
                    <div key={cert.title} className={!showAllCertificates && index >= 2 ? 'max-md:hidden' : ''}>
                        <a className='group block overflow-hidden border border-card-border bg-card rounded-xl no-underline text-inherit h-full' href={cert.link} target='_blank' rel='noreferrer'>
                            <img className='block w-full aspect-[7/5] object-cover object-center transition-transform duration-200 ease-out group-hover:scale-[1.02]' src={cert.image} alt={cert.alt}></img>
                            <div className='flex min-h-[90px] flex-col justify-center p-[10px] text-center'>
                                <p className='text-[0.95rem] leading-tight font-[Inter] font-bold text-text mb-[3px]'>{cert.title}</p>
                                <p className='text-[0.75rem] leading-[1.35] font-[Inter] text-secondary'>{cert.subtitle}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
            <h1 className='font-[Inter] text-[1.3rem] mt-[20px] mb-2.5 font-bold'>{t('about.technologiesTitle')}</h1>
            <div className='grid grid-cols-2 gap-[14px] pb-[20px] max-md:grid-cols-1'>
                {technologyGroups.map(group => (
                    <div key={group.titleKey} className='border border-card-border bg-card rounded-xl p-[14px]'>
                        <h2 className='font-[Inter] text-[1rem] font-bold text-text mb-[12px]'>{t(group.titleKey)}</h2>
                        <div className='flex flex-wrap gap-[8px]'>
                            {group.skills.map(skill => {
                                const Icon = skill.icon

                                return (
                                    <span key={skill.name} className='inline-flex items-center gap-[6px] border border-card-border rounded-[7px] px-[9px] py-[6px] text-[0.78rem] font-[Inter] font-semibold text-text'>
                                        <Icon className='text-[1rem] shrink-0' />
                                        {skill.name}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default About
