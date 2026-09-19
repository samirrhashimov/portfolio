import React, { useState, useEffect } from 'react'
import blinkImg from '../assets/images/projects/blink.png'
import brandkitImg from '../assets/images/projects/brandkit.png'
import noteifyImg from '../assets/images/projects/noteify.png'
import auraHydraImg from '../assets/images/projects/auraHydra.png'
import blogrImg from '../assets/images/projects/blogr.png'
import digitalBankImg from '../assets/images/projects/digitalBank.png'
import ipekchiImg from '../assets/images/projects/ipekchi.png'
import blog101Img from '../assets/images/projects/blog101.png'

import snapImg from '../assets/images/projects/snap.png'
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const npmPackages = ["brandkitjs"]
const GITHUB_USERNAME = "samirrhashimov"

const projects = [
    { id: 'blink', name: 'Blink', description: 'Link və resursları təşkil edib təhlükəsiz paylaşmaq üçün mərkəzləşdirilmiş platforma.', repository: 'blink', image: blinkImg, alt: 'Blink Project' },
    { id: 'ipekchi', name: 'Ipekchi', description: 'Gündəlik həyat üçün geyim və aksesuarlar təqdim edən müasir e-ticarət mağazası.', repository: 'ipekchi', image: ipekchiImg, alt: 'Ipekchi Project' },
    { id: 'blog101', name: 'Blog101', description: 'Fikirləri, yazıları və hekayələri paylaşmaq üçün minimalistik bloq platforması.', repository: 'blog101', image: blog101Img, alt: 'Blog101 Project' },
    { id: 'brandkit', name: 'brandkit', description: 'Brend ikonlarını tapmaq, embed kodu almaq və NPM ilə inteqrasiya etmək üçün alət.', repository: 'brandkit', image: brandkitImg, alt: 'Brandkit Project' },
    { id: 'snap', name: 'Snap', description: 'Remote komandaların iş axınını, tapşırıqlarını və əməkdaşlığını asanlaşdıran platforma.', repository: 'snap-landing-page', image: snapImg, alt: 'Snap Project' },
    { id: 'auraHydra', name: 'AuraHydra', description: 'Sağlam həyat tərzi üçün funksional smart bottle təqdimat səhifəsi.', repository: 'auraHydra-landing-page', image: auraHydraImg, alt: 'AuraHydra Project' },
    { id: 'blogr', name: 'Blogr', description: 'Auditoriyanı böyütmək və brendi inkişaf etdirmək üçün müasir bloq platforması.', repository: 'blogr-landing-page', image: blogrImg, alt: 'Blogr Project' },
    { id: 'digitalBank', name: 'DigitalBank', description: 'Onlayn bankçılıq, büdcə planlaması və sürətli əməliyyatlar üçün rəqəmsal həll.', repository: 'bank-landing-page', image: digitalBankImg, alt: 'DigitalBank Project' },
]

const Projects = () => {
    const { t } = useTranslation();
    const [showAllProjects, setShowAllProjects] = useState(false)
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
            <div className='flex items-center justify-between gap-4 mb-[10px]'>
                <h1 className='font-[Inter] text-[1.3rem] text-text font-bold'>{t('sections.projects')}</h1>
                {projects.length > 4 && (
                    <button type='button' className='inline-flex items-center gap-[3px] border border-card-border bg-card text-text rounded-[6px] px-[12px] py-[8px] font-[Inter] text-[12px] cursor-pointer hover:border-[#444] hover:bg-[#111]' onClick={() => setShowAllProjects(current => !current)}>
                        {showAllProjects ? t('projects.showLess') : t('projects.showMore')}
                        <span aria-hidden='true' className='ml-[6px]'>{showAllProjects ? <FaArrowLeft /> : <FaArrowRight />}</span>
                    </button>
                )}
            </div>
            <div className='grid grid-cols-4 gap-[18px] pb-[20px] max-md:grid-cols-2'>
                {projects.map((project, index) => (
                    <a key={project.id} className={`block no-underline text-inherit transition-all duration-200 ${!showAllProjects && index >= 4 ? 'hidden' : ''} ${!showAllProjects && index >= 2 ? 'max-md:hidden' : ''}`} href={`https://github.com/${GITHUB_USERNAME}/${project.repository}`} target='_blank' rel='noopener noreferrer'>
                        <div className='relative inline-block group overflow-hidden rounded-xl border-[1.5px] border-card-border'>
                            <img className='block w-full h-auto transition-transform duration-200 ease-out group-hover:scale-[1.02]'
                                src={project.image}
                                alt={project.alt}
                            />
                        </div>
                        <p className='font-[Inter] text-[0.95rem] leading-tight font-bold text-text text-left mt-[8px] mb-[3px]'>{project.name}</p>
                        <p className='font-[Inter] text-[0.75rem] leading-[1.35] text-secondary text-left min-h-[2.7em]'>{project.description}</p>
                    </a>
                ))}
            </div>

            <h1 className='font-[Inter] text-[1.3rem] mt-[20px] mb-[10px] text-text font-bold'>{t('projects.packages')}</h1>
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
            <h1 className='font-[Inter] text-[1.3rem] mt-[20px] mb-[10px] text-text font-bold'>{t('projects.githubRepos')}</h1>
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
