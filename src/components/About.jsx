import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import pp from '../assets/images/samirr.jpg'
import { FaGithub, FaLinkedin, FaInstagram, FaMicrosoft, FaTimes, FaExpand, FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiMedium, SiBuymeacoffee, SiHtml5, SiCss, SiJavascript, SiReact, SiVite, SiFigma, SiFirebase, SiVercel, SiNetlify, SiGit } from "react-icons/si";
import { BiLogoDevTo } from "react-icons/bi";
import edugovazFrontBackend from "../assets/images/certificate/edugovaz-frontbackend.jpg"
import freecodecampResponsiveWeb from "../assets/images/certificate/freecodecamp-responsivewebdesign.png"
import AZ900 from "../assets/images/certificate/AZ-900.png"
import fullstackopen from "../assets/images/certificate/fullstackopen-fullstack.png"
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
        title: 'University of Helsinki',
        subtitle: 'Full Stack Open - Deep Dive Into Modern Web Development (Part 0-4)',
        image: fullstackopen,
        alt: 'Full Stack Open Deep Dive Into Modern Web Development certificate',
        link: 'https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/1ed273d281b891477f8b82304bd05f0f'
    },
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
    const [selectedCertIndex, setSelectedCertIndex] = useState(null);
    const [isClosing, setIsClosing] = useState(false);
    const [slideDirection, setSlideDirection] = useState('next');
    const [slideKey, setSlideKey] = useState(0);
    const lightboxRef = React.useRef(null);

    const openLightbox = (index) => {
        setIsClosing(false);
        setSlideDirection('next');
        setSlideKey(0);
        setSelectedCertIndex(index);
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedCertIndex(null);
            setIsClosing(false);
        }, 200);
    };

    const handleNext = (e) => {
        if (e) e.stopPropagation();
        if (selectedCertIndex < certificates.length - 1) {
            setSlideDirection('next');
            setSlideKey(prev => prev + 1);
            setSelectedCertIndex(prev => prev + 1);
        }
    };

    const handlePrev = (e) => {
        if (e) e.stopPropagation();
        if (selectedCertIndex > 0) {
            setSlideDirection('prev');
            setSlideKey(prev => prev + 1);
            setSelectedCertIndex(prev => prev - 1);
        }
    };

    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedCertIndex === null) return;
            if (e.key === 'Escape') handleClose();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedCertIndex]);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            lightboxRef.current?.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    };

    const renderCertificateCard = (cert) => {
        const index = certificates.indexOf(cert);
        return (
            <div key={cert.title}>
                <div
                    className='overflow-hidden border border-card-border bg-card rounded-xl h-full cursor-pointer group transition-all duration-300 hover:border-accent/40 hover:shadow-lg'
                    onClick={() => openLightbox(index)}
                >
                    <div className='block overflow-hidden bg-black/5 relative'>
                        <img className='block w-full aspect-[7/5] object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105' src={cert.image} alt={cert.alt} loading='lazy' />
                        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center'>
                            <div className='p-3 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 drop-shadow-lg backdrop-blur-sm'>
                                <FaExpand className='text-xl' />
                            </div>
                        </div>
                    </div>
                    <div className='flex min-h-[90px] flex-col justify-center p-[10px] text-center'>
                        <p className='text-[0.95rem] leading-tight font-[Inter] font-bold text-text mb-[3px] group-hover:text-section-header transition-colors duration-200'>{cert.title}</p>
                        <p className='text-[0.75rem] leading-[1.35] font-[Inter] text-secondary'>{cert.subtitle}</p>
                    </div>
                </div>
            </div>
        );
    };

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
            {/* Desktop View */}
            <div className='hidden md:grid grid-cols-4 gap-[18px] pb-[20px]'>
                {certificates.map(renderCertificateCard)}
            </div>

            {/* Mobile View */}
            <div className='md:hidden pb-[20px]'>
                <div className='grid grid-cols-2 gap-[18px]'>
                    {certificates.slice(0, 2).map(renderCertificateCard)}
                </div>
                <div className={`grid grid-cols-2 gap-[18px] overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-in-out ${showAllCertificates ? 'max-h-[2000px] opacity-100 mt-[18px]' : 'pointer-events-none max-h-0 opacity-0 mt-0'}`}>
                    {certificates.slice(2).map(renderCertificateCard)}
                </div>
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

            {/* Lightbox */}
            {selectedCertIndex !== null && typeof document !== 'undefined' && createPortal(
                <div
                    ref={lightboxRef}
                    className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-all duration-300 ${isClosing ? 'animate-lightbox-fade-out' : 'animate-lightbox-fade-in'}`}
                    onClick={handleClose}
                >
                    {/* Top Bar */}
                    <div className='absolute top-6 left-6 right-6 flex justify-between items-center text-white z-10' onClick={e => e.stopPropagation()}>
                        <div className='flex flex-col pr-4 animate-lightbox-zoom-in'>
                            <p className='font-[Inter] font-bold text-lg max-md:text-base line-clamp-1'>{certificates[selectedCertIndex].title}</p>
                            <p className='font-[Inter] text-sm text-gray-400 max-md:text-xs line-clamp-1'>{certificates[selectedCertIndex].subtitle}</p>
                        </div>
                        <div className='flex items-center gap-2 md:gap-3 shrink-0'>
                            <a
                                href={certificates[selectedCertIndex].link}
                                target='_blank'
                                rel='noreferrer'
                                onClick={e => e.stopPropagation()}
                                className='h-9 md:h-10 px-3.5 md:px-4.5 rounded-full inline-flex items-center gap-2 bg-section-header text-white font-[Inter] font-semibold text-xs md:text-sm shadow-lg transition-colors duration-200 hover:bg-accent-hover shrink-0'
                            >
                                <FaExternalLinkAlt className='text-xs md:text-sm' /> 
                                <span>{t('about.verifyCertificate', 'Verify Certificate')}</span>
                            </a>
                            <button
                                type='button'
                                onClick={(e) => { e.stopPropagation(); toggleFullScreen(); }}
                                className='w-9 h-9 md:w-10 md:h-10 inline-flex items-center justify-center text-white hover:text-gray-200 transition-all duration-200 bg-white/10 hover:bg-white/20 rounded-full hover:scale-105 active:scale-95 shrink-0'
                                title='Full Screen'
                            >
                                <FaExpand className='text-sm md:text-base' />
                            </button>
                            <button
                                type='button'
                                onClick={(e) => { e.stopPropagation(); handleClose(); }}
                                className='w-9 h-9 md:w-10 md:h-10 inline-flex items-center justify-center text-white hover:text-gray-200 transition-all duration-200 bg-white/10 hover:bg-white/20 rounded-full hover:scale-105 active:scale-95 shrink-0'
                                title='Close'
                            >
                                <FaTimes className='text-base md:text-lg' />
                            </button>
                        </div>
                    </div>

                    {/* Content / Image Container */}
                    <div
                        className={`relative w-full max-w-5xl max-h-[75vh] flex items-center justify-center mt-12 max-md:mt-24 ${isClosing ? 'animate-lightbox-zoom-out' : 'animate-lightbox-zoom-in'}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <img
                            key={`${selectedCertIndex}-${slideKey}`}
                            src={certificates[selectedCertIndex].image}
                            alt={certificates[selectedCertIndex].alt}
                            className={`max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl ${slideDirection === 'next' ? 'animate-cert-slide-next' : 'animate-cert-slide-prev'}`}
                        />

                        {/* Navigation Arrows */}
                        {selectedCertIndex > 0 && (
                            <button
                                type='button'
                                className='absolute left-[-15px] md:left-[-60px] top-1/2 -translate-y-1/2 text-white hover:bg-white/20 transition-all duration-200 p-3 bg-black/60 rounded-full hover:scale-110 active:scale-95 shadow-xl backdrop-blur-sm'
                                onClick={handlePrev}
                                title='Previous Certificate'
                            >
                                <FaChevronLeft className='text-xl md:text-3xl' />
                            </button>
                        )}
                        {selectedCertIndex < certificates.length - 1 && (
                            <button
                                type='button'
                                className='absolute right-[-15px] md:right-[-60px] top-1/2 -translate-y-1/2 text-white hover:bg-white/20 transition-all duration-200 p-3 bg-black/60 rounded-full hover:scale-110 active:scale-95 shadow-xl backdrop-blur-sm'
                                onClick={handleNext}
                                title='Next Certificate'
                            >
                                <FaChevronRight className='text-xl md:text-3xl' />
                            </button>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}

export default About
