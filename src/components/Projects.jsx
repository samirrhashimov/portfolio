import React, { useState, useEffect } from 'react'
import blinkImg from '../assets/images/projects/blink.png'
import blinkHoverImg from '../assets/images/projects/blinkhover.png'
import bakuWeatherImg from '../assets/images/projects/bakuWeather.png'
import bakuWeatherHoverImg from '../assets/images/projects/bakuWeatherHover.png'
import brandkitImg from '../assets/images/projects/brandkit.png'
import brandkitHoverImg from '../assets/images/projects/brandkitjsHover.png'
import noteifyImg from '../assets/images/projects/noteify.png'
import noteifyHoverImg from '../assets/images/projects/noteifyHover.png'
import whispenImg from '../assets/images/projects/whispen.png'
import whispenHoverImg from '../assets/images/projects/whispenHover.png'
import auraHydraImg from '../assets/images/projects/auraHydra.png'
import blogrImg from '../assets/images/projects/blogr.png'
import digitalBankImg from '../assets/images/projects/digitalBank.png'

import snapImg from '../assets/images/projects/snap.png'
import { useTranslation } from 'react-i18next';

const npmPackages = ["brandkitjs"]
const GITHUB_USERNAME = "samirrhashimov"

const Projects = () => {
    const { t } = useTranslation();
    const [hoveredProject, setHoveredProject] = useState(null);
    const [packages, setPackages] = useState([])
    const [repos, setRepos] = useState([])
    const [reposError, setReposError] = useState(false)

    useEffect(() => {
        Promise.all(
            npmPackages.map(name =>
                fetch(`https://registry.npmjs.org/${name}/latest`)
                    .then(res => res.json())
                    .then(data => ({
                        name: data.name,
                        version: data.version,
                        description: data.description,
                        url: `https://www.npmjs.com/package/${data.name}`
                    }))
                    .catch(() => null)
            )
        ).then(res => setPackages(res.filter(p => p !== null)))
    }, [])

    useEffect(() => {
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`)
            .then(res => {
                if (!res.ok) throw new Error('API error')
                return res.json()
            })
            .then(data => {
                if (Array.isArray(data)) {
                    const filteredRepos = data
                        .filter(repo => !repo.fork)
                        .slice(0, 6)
                        .map(repo => ({
                            name: repo.name,
                            description: repo.description,
                            language: repo.language || 'Unknown',
                            url: repo.html_url
                        }))
                    setRepos(filteredRepos)
                    setReposError(false)
                }
            })
            .catch(err => {
                console.error('GitHub API unreachable or rate limited', err)
                setReposError(true)
            })
    }, [])

    return (
        <div>
            <h1 className='font-[Inter] text-[1.3rem] mb-[10px] text-text font-bold'>{t('projects.webApps')}</h1>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,200px))] justify-start gap-[18px] pb-[20px] max-md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]'>
                <a className='block no-underline text-inherit transition-all duration-200' href={`https://github.com/${GITHUB_USERNAME}/blink`} target='_blank' rel='noopener noreferrer'>
                    <div className='relative inline-block group'
                        onMouseEnter={() => setHoveredProject('blink')}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        <img className='w-[200px] border-[1.5px] border-card-border rounded-xl transition-opacity duration-300 max-md:w-full max-md:h-auto group-hover:border-white'
                            src={blinkImg}
                            alt="Blink Project"
                            style={{ opacity: hoveredProject === 'blink' ? 0 : 1 }}
                        />
                        <img className='w-[200px] border-[1.5px] border-card-border rounded-xl transition-opacity duration-300 max-md:w-full max-md:h-auto absolute top-0 left-0 group-hover:border-white'
                            src={blinkHoverImg}
                            alt="Blink Hover"
                            style={{ opacity: hoveredProject === 'blink' ? 1 : 0 }}
                        />
                    </div>
                    <p className='flex font-[Inter] text-[0.9rem] my-[5px] items-center justify-center'><b>Blink</b>&nbsp;- Link Sharing Platform</p>
                </a>
                <a className='block no-underline text-inherit transition-all duration-200' href={`https://github.com/${GITHUB_USERNAME}/bakuWeather`} target='_blank' rel='noopener noreferrer'>
                    <div className='relative inline-block group'
                        onMouseEnter={() => setHoveredProject('baku')}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        <img className='w-[200px] border-[1.5px] border-card-border rounded-xl transition-opacity duration-300 max-md:w-full max-md:h-auto group-hover:border-white'
                            src={bakuWeatherImg}
                            alt="Baku Weather Project"
                            style={{ opacity: hoveredProject === 'baku' ? 0 : 1 }}
                        />
                        <img className='w-[200px] border-[1.5px] border-card-border rounded-xl transition-opacity duration-300 max-md:w-full max-md:h-auto absolute top-0 left-0 group-hover:border-white'
                            src={bakuWeatherHoverImg}
                            alt="Baku Weather Demo"
                            style={{ opacity: hoveredProject === 'baku' ? 1 : 0 }}
                        />
                    </div>
                    <p className='flex font-[Inter] text-[0.9rem] my-[5px] items-center justify-center'><b>bakuWeather</b>&nbsp;- Weather App</p>
                </a>
                <a className='block no-underline text-inherit transition-all duration-200' href={`https://github.com/${GITHUB_USERNAME}/brandkit`} target='_blank' rel='noopener noreferrer'>
                    <div className='relative inline-block group'
                        onMouseEnter={() => setHoveredProject('brandkit')}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        <img className='w-[200px] border-[1.5px] border-card-border rounded-xl transition-opacity duration-300 max-md:w-full max-md:h-auto group-hover:border-white'
                            src={brandkitImg}
                            alt="Brandkit Project"
                            style={{ opacity: hoveredProject === 'brandkit' ? 0 : 1 }}
                        />
                        <img className='w-[200px] border-[1.5px] border-card-border rounded-xl transition-opacity duration-300 max-md:w-full max-md:h-auto absolute top-0 left-0 group-hover:border-white'
                            src={brandkitHoverImg}
                            alt="Brandkit Demo"
                            style={{ opacity: hoveredProject === 'brandkit' ? 1 : 0 }}
                        />
                    </div>
                    <p className='flex font-[Inter] text-[0.9rem] my-[5px] items-center justify-center'><b>brandkit</b>&nbsp;- NPM Icon Library</p>
                </a>
                <a className='block no-underline text-inherit transition-all duration-200' href={`https://github.com/${GITHUB_USERNAME}/noteify`} target='_blank' rel='noopener noreferrer'>
                    <div className='relative inline-block group'
                        onMouseEnter={() => setHoveredProject('noteify')}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        <img className='w-[200px] border-[1.5px] border-card-border rounded-xl transition-opacity duration-300 max-md:w-full max-md:h-auto group-hover:border-white'
                            src={noteifyImg}
                            alt="Noteify Project"
                            style={{ opacity: hoveredProject === 'noteify' ? 0 : 1 }}
                        />
                        <img className='w-[200px] border-[1.5px] border-card-border rounded-xl transition-opacity duration-300 max-md:w-full max-md:h-auto absolute top-0 left-0 group-hover:border-white'
                            src={noteifyHoverImg}
                            alt="Noteify Demo"
                            style={{ opacity: hoveredProject === 'noteify' ? 1 : 0 }}
                        />
                    </div>
                    <p className='flex font-[Inter] text-[0.9rem] my-[5px] items-center justify-center'><b>Noteify</b>&nbsp;- Cloud Notepad</p>
                </a>
                <a className='block no-underline text-inherit transition-all duration-200' href={`https://github.com/${GITHUB_USERNAME}/whispen`} target='_blank' rel='noopener noreferrer'>
                    <div className='relative inline-block group'
                        onMouseEnter={() => setHoveredProject('whispen')}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        <img className='w-[200px] border-[1.5px] border-card-border rounded-xl transition-opacity duration-300 max-md:w-full max-md:h-auto group-hover:border-white'
                            src={whispenImg}
                            alt="Whispen Project"
                            style={{ opacity: hoveredProject === 'whispen' ? 0 : 1 }}
                        />
                        <img className='w-[200px] border-[1.5px] border-card-border rounded-xl transition-opacity duration-300 max-md:w-full max-md:h-auto absolute top-0 left-0 group-hover:border-white'
                            src={whispenHoverImg}
                            alt="Whispen Demo"
                            style={{ opacity: hoveredProject === 'whispen' ? 1 : 0 }}
                        />
                    </div>
                    <p className='flex font-[Inter] text-[0.9rem] my-[5px] items-center justify-center'><b>Whispen</b>&nbsp;- PDF reader App</p>
                </a>
            </div>

            {/* New area */}
            <h1 className='font-[Inter] text-[1.3rem] mb-[10px] text-text font-bold'>{t('projects.landingPages')}</h1>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,200px))] justify-start gap-[18px] pb-[20px] max-md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]'>
                <a className='block no-underline text-inherit transition-all duration-200' href={`https://github.com/${GITHUB_USERNAME}/snap-landing-page`} target='_blank' rel='noopener noreferrer'>
                    <div className='relative inline-block group'>
                        <img className='w-[200px] border-[1.5px] border-card-border rounded-xl transition-opacity duration-300 max-md:w-full max-md:h-auto group-hover:border-white'
                            src={snapImg}
                            alt="snap Project"
                        />
                    </div>
                    <p className='flex font-[Inter] text-[0.9rem] my-[5px] items-center justify-center'><b>Snap </b>&nbsp;- SaaS Page</p>
                </a>
                <a className='block no-underline text-inherit transition-all duration-200' href={`https://github.com/${GITHUB_USERNAME}/auraHydra-landing-page`} target='_blank' rel='noopener noreferrer'>
                    <div className='relative inline-block group'>
                        <img className='w-[200px] border-[1.5px] border-card-border rounded-xl transition-opacity duration-300 max-md:w-full max-md:h-auto group-hover:border-white'
                            src={auraHydraImg}
                            alt="AuraHydra Project"
                        />
                    </div>
                    <p className='flex font-[Inter] text-[0.9rem] my-[5px] items-center justify-center'><b>AuraHydra</b>&nbsp;- DTC Page</p>
                </a>
                <a className='block no-underline text-inherit transition-all duration-200' href={`https://github.com/${GITHUB_USERNAME}/blogr-landing-page`} target='_blank' rel='noopener noreferrer'>
                    <div className='relative inline-block group'>
                        <img className='w-[200px] border-[1.5px] border-card-border rounded-xl transition-opacity duration-300 max-md:w-full max-md:h-auto group-hover:border-white'
                            src={blogrImg}
                            alt="Blogr Project"
                        />
                    </div>
                    <p className='flex font-[Inter] text-[0.9rem] my-[5px] items-center justify-center'><b>Blogr</b>&nbsp;- SaaS Page</p>
                </a>
                <a className='block no-underline text-inherit transition-all duration-200' href={`https://github.com/${GITHUB_USERNAME}/bank-landing-page`} target='_blank' rel='noopener noreferrer'>
                    <div className='relative inline-block group'>
                        <img className='w-[200px] border-[1.5px] border-card-border rounded-xl transition-opacity duration-300 max-md:w-full max-md:h-auto group-hover:border-white'
                            src={digitalBankImg}
                            alt="DigitalBank Project"
                        />
                    </div>
                    <p className='flex font-[Inter] text-[0.9rem] my-[5px] items-center justify-center'><b>DigitalBank</b>&nbsp;- SaaS Page</p>
                </a>
            </div>
            {/* New area end */}
            <h1 className='font-[Inter] text-[1.3rem] mb-[10px] text-text font-bold'>{t('projects.packages')}</h1>
            <div className='grid grid-cols-2 gap-[18px] pb-[20px] max-md:grid-cols-1'>
                {packages.length === 0 ? (
                    <div className='border-[1.5px] border-card-border rounded-[10px_0] p-[15px] break-words relative min-h-[150px] bg-card transition-all duration-300 flex flex-col hover:border-text max-md:min-h-0 max-md:pb-[60px]'>
                        <p>{t('projects.noResults')}</p>
                    </div>
                ) : (
                    packages.map(pkg => (
                        <a key={pkg.name} href={pkg.url} target='_blank' rel='noopener noreferrer' className='border-[1.5px] border-card-border rounded-[10px_0] p-[15px] break-words relative min-h-[150px] bg-card transition-all duration-300 flex flex-col hover:border-text max-md:min-h-0 max-md:pb-[60px] no-underline text-inherit'>
                            <p className='font-[Inter] font-bold text-text'>{pkg.name}</p>
                            <p className='font-[Inter] text-[0.8rem] mt-[5px] mb-[10px] text-secondary'>{pkg.description}</p>
                            <p className='inline-flex items-center gap-[6px] font-[Inter] py-[6px] px-[10px] bg-badge border border-badge-border text-text rounded-[4px] w-fit mt-auto absolute bottom-[15px] text-[0.75rem] font-semibold uppercase tracking-[0.5px] transition-all duration-200'>v{pkg.version}</p>
                        </a>
                    ))
                )}
            </div>
            <h1 className='font-[Inter] text-[1.3rem] mb-[10px] text-text font-bold'>{t('projects.githubRepos')}</h1>
            <div className='grid grid-cols-2 gap-[18px] pb-[15px] max-md:grid-cols-1'>
                {reposError ? (
                    <div className='border-[1.5px] border-card-border rounded-[10px_0] p-[15px] break-words relative min-h-[150px] bg-card cursor-pointer transition-all duration-300 flex flex-col hover:border-text max-md:min-h-0 max-md:pb-[60px]'>
                        <p>{t('projects.error')}</p>
                    </div>
                ) : repos.length === 0 ? (
                    <div className='border-[1.5px] border-card-border rounded-[10px_0] p-[15px] break-words relative min-h-[150px] bg-card cursor-pointer transition-all duration-300 flex flex-col hover:border-text max-md:min-h-0 max-md:pb-[60px]'>
                        <p>{t('projects.loading')}</p>
                    </div>
                ) : (
                    repos.map(repo => (
                        <a key={repo.name} href={repo.url} target='_blank' rel='noopener noreferrer' className='border-[1.5px] border-card-border rounded-[10px_0] p-[15px] break-words relative min-h-[150px] bg-card cursor-pointer transition-all duration-300 flex flex-col hover:border-text max-md:min-h-0 max-md:pb-[60px] no-underline text-inherit'>
                            <p className='font-[Inter] font-bold m-0 text-text'>{repo.name}</p>
                            <p className='font-[Inter] text-[0.8rem] mt-[5px] mb-[10px] text-secondary'>{repo.description || 'No description'}</p>
                            <p className='inline-flex items-center gap-[6px] font-[Inter] py-[6px] px-[10px] bg-badge border border-badge-border text-text rounded-[4px] w-fit mt-auto absolute bottom-[15px] text-[0.75rem] font-semibold uppercase tracking-[0.5px] transition-all duration-200'>{repo.language}</p>
                        </a>
                    ))
                )}
            </div>
        </div>
    )
}

export default Projects
