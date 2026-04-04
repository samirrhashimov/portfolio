import React from 'react'
import pp from '../assets/images/samirr.jpg'
import '../styles/about.css'
import { FaGithub, FaLinkedin, FaInstagram, } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiMedium, SiBuymeacoffee } from "react-icons/si";
import { BiLogoDevTo } from "react-icons/bi";

const About = () => {
    return (
        <div className='about'>
            <div className='aboutRight'>
                <img className='pp' src={pp} alt='Samirr' />
                <p className='userName'>@samirrhashimov</p>
                <p className='miniBio'>Front-End Developer & UI Designer</p>
                <div className='socialMedia'>
                    <a href="https://github.com/samirrhashimov" target="_blank" rel="noreferrer">
                        <FaGithub className='socialIcons' />
                    </a>
                    <a href="https://linkedin.com/in/samirrhashimov" target="_blank" rel="noreferrer">
                        <FaLinkedin className='socialIcons' />
                    </a>
                    <a href="https://instagram.com/samirrhashimov" target="_blank" rel="noreferrer">
                        <FaInstagram className='socialIcons' />
                    </a>
                    <a href="https://x.com/samirrhashimov" target="_blank" rel="noreferrer">
                        <FaXTwitter className='socialIcons' />
                    </a>
                    <a href="https://medium.com/@samirrhashimov" target="_blank" rel="noreferrer">
                        <SiMedium className='socialIcons' />
                    </a>
                    <a href="https://dev.to/samirrhashimov" target="_blank" rel="noreferrer">
                        <BiLogoDevTo className='socialIcons' />
                    </a>
                    <a href="https://buymeacoffee.com/samirrhashimov" target="_blank" rel="noreferrer">
                        <SiBuymeacoffee className='socialIcons' />
                    </a>
                </div>
            </div>
            <div className='aboutLeft'>
                <p className='bio'>
                    I am Samir Hashimov, a Front-End developer and UI designer based in Baku, Azerbaijan. 
                    I create modern web applications with HTML5, CSS3, JavaScript, and React. <br/>
                    Additionally, I create and publish my own products. My link management platform, called Blink, is available on the web, on Google Play, and as a Firefox extension. Currently, I am deepening my knowledge of the React ecosystem, exploring TypeScript, and switching to using Tailwind for efficiency.
                </p>
                <img className='skillIcons' src="https://skillicons.dev/icons?i=html,css,js,react,vite,python,git,github,npm,firebase,netlify,vercel,vscode" />
            </div>
        </div>
    )
}

export default About
