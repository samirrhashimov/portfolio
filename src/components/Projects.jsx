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
const SUBSTACK_FEED_URL = 'https://samirrhashimov.substack.com/feed/'
const SUBSTACK_ARCHIVE_URL = 'https://samirrhashimov.substack.com/api/v1/archive?sort=new&search='

const normalizeBlog = (item, description, link, image) => ({
    id: item.guid || item.id || link,
    title: item.title,
    description,
    post_date: item.pubDate || item.post_date,
    canonical_url: link || item.link || item.canonical_url,
    cover_image: image || item.cover_image
})

const parseXMLFeed = (xmlText, limit) => {
    const xml = new DOMParser().parseFromString(xmlText, 'application/xml')
    const items = Array.from(xml.querySelectorAll('item'))
    if (items.length === 0) throw new Error('Invalid Substack feed')

    return items.slice(0, limit).map(item => {
        const rawDescription = item.querySelector('description')?.textContent || ''
        const descriptionDocument = new DOMParser().parseFromString(rawDescription, 'text/html')
        const image = item.querySelector('enclosure')?.getAttribute('url') || descriptionDocument.querySelector('img')?.src

        return normalizeBlog(
            { guid: item.querySelector('guid')?.textContent, title: item.querySelector('title')?.textContent, pubDate: item.querySelector('pubDate')?.textContent },
            descriptionDocument.body.textContent.trim(),
            item.querySelector('link')?.textContent,
            image
        )
    })
}

const fetchBlogsFromCodetabs = (limit) => fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(SUBSTACK_FEED_URL)}`)
    .then(res => {
        if (!res.ok) throw new Error('Codetabs proxy error')
        return res.text()
    })
    .then(xmlText => parseXMLFeed(xmlText, limit))

const fetchBlogsFromAllOrigins = (limit) => fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(SUBSTACK_FEED_URL)}`)
    .then(res => {
        if (!res.ok) throw new Error('AllOrigins proxy error')
        return res.json()
    })
    .then(data => {
        if (!data.contents) throw new Error('Invalid AllOrigins response')
        return parseXMLFeed(data.contents, limit)
    })

const fetchBlogsFromProxy = (limit) => fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(SUBSTACK_FEED_URL)}`)
    .then(res => {
        if (!res.ok) throw new Error('RSS proxy error')
        return res.json()
    })
    .then(data => {
        if (data.status !== 'ok' || !Array.isArray(data.items)) throw new Error('Invalid RSS proxy response')

        return data.items.slice(0, limit).map(item => normalizeBlog(
            { guid: item.guid, title: item.title, pubDate: item.pubDate },
            new DOMParser().parseFromString(item.description || '', 'text/html').body.textContent.trim(),
            item.link,
            item.thumbnail || item.enclosure?.link
        ))
    })

const fetchBlogs = (limit) => 
    fetchBlogsFromProxy(limit)
        .catch(() => fetchBlogsFromCodetabs(limit))
        .catch(() => fetchBlogsFromAllOrigins(limit))
        .catch(() =>
            fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(SUBSTACK_ARCHIVE_URL + '&limit=' + limit)}`)
                .then(res => {
                    if (!res.ok) throw new Error('Substack archive error')
                    return res.json()
                })
                .then(data => {
                    if (!data.contents) throw new Error('Invalid Substack archive')
                    const items = JSON.parse(data.contents)
                    if (!Array.isArray(items)) throw new Error('Invalid Substack archive format')
                    return items.slice(0, limit).map(item => normalizeBlog(item, item.description || item.subtitle, item.canonical_url, item.cover_image))
                })
        )

const projects = [
    { id: 'blink', name: 'Blink', descriptionKey: 'projects.descriptions.blink', repository: 'blink', image: blinkImg, alt: 'Blink Project' },
    { id: 'ipekchi', name: 'Ipekchi', descriptionKey: 'projects.descriptions.ipekchi', repository: 'ipekchi', image: ipekchiImg, alt: 'Ipekchi Project' },
    { id: 'blog101', name: 'Blog101', descriptionKey: 'projects.descriptions.blog101', repository: 'blog101', image: blog101Img, alt: 'Blog101 Project' },
    { id: 'brandkit', name: 'brandkit', descriptionKey: 'projects.descriptions.brandkit', repository: 'brandkit', image: brandkitImg, alt: 'Brandkit Project' },
    { id: 'snap', name: 'Snap', descriptionKey: 'projects.descriptions.snap', repository: 'snap-landing-page', image: snapImg, alt: 'Snap Project' },
    { id: 'auraHydra', name: 'AuraHydra', descriptionKey: 'projects.descriptions.auraHydra', repository: 'auraHydra-landing-page', image: auraHydraImg, alt: 'AuraHydra Project' },
    { id: 'blogr', name: 'Blogr', descriptionKey: 'projects.descriptions.blogr', repository: 'blogr-landing-page', image: blogrImg, alt: 'Blogr Project' },
    { id: 'digitalBank', name: 'DigitalBank', descriptionKey: 'projects.descriptions.digitalBank', repository: 'bank-landing-page', image: digitalBankImg, alt: 'DigitalBank Project' },
]

const ProjectCard = ({ project }) => {
    const { t } = useTranslation();

    return (
        <a className='block no-underline text-inherit transition-all duration-300' href={`https://github.com/${GITHUB_USERNAME}/${project.repository}`} target='_blank' rel='noopener noreferrer'>
            <div className='relative inline-block group overflow-hidden rounded-xl border-[1.5px] border-card-border'>
                <img className='block w-full h-auto transition-transform duration-200 ease-out group-hover:scale-[1.02]'
                    src={project.image}
                    alt={project.alt}
                />
            </div>
            <div className='p-[10px]'>
                <p className='font-[Inter] text-[0.95rem] leading-tight font-bold text-text text-left mb-[3px]'>{project.name}</p>
                <p className='font-[Inter] text-[0.75rem] leading-[1.35] text-secondary text-left min-h-[2.7em]'>{t(project.descriptionKey)}</p>
            </div>
        </a>
    )
}

const monthNames = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    az: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn', 'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek']
}

const BlogCard = ({ blog, language }) => {
    const publishedDateValue = new Date(blog.post_date)
    const dateLanguage = language === 'az' ? 'az' : 'en'
    const publishedDate = `${String(publishedDateValue.getUTCDate()).padStart(2, '0')} ${monthNames[dateLanguage][publishedDateValue.getUTCMonth()]} ${publishedDateValue.getUTCFullYear()}`

    return (
        <a href={blog.canonical_url} target='_blank' rel='noopener noreferrer' className='group no-underline text-inherit'>
            {blog.cover_image && (
                <div className='relative overflow-hidden rounded-xl border-[1.5px] border-card-border'>
                    <img className='block aspect-[1.65] w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]' src={blog.cover_image} alt={blog.title} />
                </div>
            )}
            <div className='p-[10px]'>
                <p className='font-[Inter] text-[0.9rem] leading-[1.3] font-bold text-text text-left mb-[4px] line-clamp-2'>{blog.title}</p>
                <p className='font-[Inter] text-[0.7rem] leading-tight text-secondary text-left mt-[7px]'>{publishedDate}</p>
            </div>
        </a>
    )
}

const Projects = () => {
    const { t, i18n } = useTranslation();
    const [showAllProjects, setShowAllProjects] = useState(false)
    const [showAllBlogs, setShowAllBlogs] = useState(false)
    const [packages, setPackages] = useState([])
    const [repos, setRepos] = useState([])
    const [reposError, setReposError] = useState(false)
    const [blogs, setBlogs] = useState([])
    const [blogsLoading, setBlogsLoading] = useState(true)
    const [blogsError, setBlogsError] = useState(false)

    useEffect(() => {
        fetchBlogs(5)
            .then(data => {
                setBlogs(data)
                setBlogsError(false)
            })
            .catch(err => {
                console.error('Substack RSS feed unreachable', err)
                setBlogsError(true)
            })
            .finally(() => setBlogsLoading(false))

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

    const handleShowAllBlogs = () => {
        if (showAllBlogs) {
            setShowAllBlogs(false)
            return
        }

        setBlogsLoading(true)
        fetchBlogs(20)
            .then(data => {
                setBlogs(data)
                setBlogsError(false)
                setShowAllBlogs(true)
            })
            .catch(err => {
                console.error('Substack RSS feed unreachable', err)
                setBlogsError(true)
            })
            .finally(() => setBlogsLoading(false))
    }

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
                {projects.length > 2 && (
                    <button type='button' className={`inline-flex items-center gap-[3px] border border-card-border bg-card text-text rounded-[6px] px-[12px] py-[8px] font-[Inter] text-[12px] cursor-pointer hover:border-border-hover hover:bg-hover-surface ${projects.length <= 4 ? 'max-md:inline-flex md:hidden' : ''}`} onClick={() => setShowAllProjects(current => !current)}>
                        {showAllProjects ? t('projects.showLess') : t('projects.showMore')}
                        <span aria-hidden='true' className='ml-[6px]'>{showAllProjects ? <FaArrowLeft /> : <FaArrowRight />}</span>
                    </button>
                )}
            </div>
            <div className='grid grid-cols-4 gap-[18px] pb-[20px] max-md:grid-cols-2'>
                {projects.slice(0, 4).map((project, index) => (
                    <div key={project.id} className={!showAllProjects && index >= 2 ? 'max-md:hidden' : ''}>
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
            <div className={`grid grid-cols-4 gap-[18px] overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out max-md:grid-cols-2 ${showAllProjects ? 'max-h-[2000px] opacity-100' : 'pointer-events-none max-h-0 opacity-0'}`}>
                {projects.slice(4).map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            <div className='flex items-center justify-between gap-4 mt-[20px] mb-[10px]'>
                <h1 className='font-[Inter] text-[1.3rem] text-text font-bold'>{t('projects.blogs')}</h1>
                {blogs.length > 2 && (
                    <button type='button' className={`inline-flex items-center gap-[3px] border border-card-border bg-card text-text rounded-[6px] px-[12px] py-[8px] font-[Inter] text-[12px] cursor-pointer hover:border-border-hover hover:bg-hover-surface ${blogs.length <= 4 ? 'max-md:inline-flex md:hidden' : ''}`} onClick={handleShowAllBlogs} disabled={blogsLoading && blogs.length > 0}>
                        {showAllBlogs ? t('projects.showLess') : t('projects.showMore')}
                        <span aria-hidden='true' className='ml-[6px]'>{showAllBlogs ? <FaArrowLeft /> : <FaArrowRight />}</span>
                    </button>
                )}
            </div>
            <div className='grid grid-cols-4 gap-[18px] pb-[20px] max-md:grid-cols-2'>
                {blogsError ? (
                    <p className='font-[Inter] text-[0.8rem] text-secondary'>{t('projects.blogsError')}</p>
                ) : blogsLoading && blogs.length === 0 ? (
                    <p className='font-[Inter] text-[0.8rem] text-secondary'>{t('projects.loading')}</p>
                ) : (
                    (showAllBlogs ? blogs : blogs.slice(0, 4)).map((blog, index) => (
                        <div key={blog.id} className={!showAllBlogs && index >= 2 ? 'max-md:hidden' : ''}>
                            <BlogCard blog={blog} language={i18n.language} />
                        </div>
                    ))
                )}
            </div>

            <h1 className='font-[Inter] text-[1.3rem] mt-[20px] mb-[10px] text-text font-bold'>{t('projects.packages')}</h1>
            <div className='grid grid-cols-3 gap-[18px] pb-[20px] max-md:grid-cols-1'>
                {packages.length === 0 ? (
                    <div className='border-[1.5px] border-card-border rounded-[10px_0] p-[15px] break-words relative min-h-[150px] bg-card transition-all duration-300 flex flex-col hover:border-border-hover max-md:min-h-0 max-md:pb-[60px]'>
                        <p>{t('projects.noResults')}</p>
                    </div>
                ) : (
                    packages.map(pkg => (
                        <a key={pkg.name} href={pkg.url} target='_blank' rel='noopener noreferrer' className='border-[1.5px] border-card-border rounded-[10px_0] p-[15px] break-words relative min-h-[150px] bg-card transition-all duration-300 flex flex-col hover:border-border-hover max-md:min-h-0 max-md:pb-[60px] no-underline text-inherit'>
                            <p className='font-[Inter] font-bold text-text'>{pkg.name}</p>
                            <p className='font-[Inter] text-[0.8rem] mt-[5px] mb-[10px] text-secondary'>{pkg.description}</p>
                            <p className='inline-flex items-center gap-[6px] font-[Inter] py-[6px] px-[10px] bg-badge border border-badge-border text-text rounded-[4px] w-fit mt-auto absolute bottom-[15px] text-[0.75rem] font-semibold uppercase tracking-[0.5px] transition-all duration-200'>v{pkg.version}</p>
                        </a>
                    ))
                )}
            </div>
            <h1 className='font-[Inter] text-[1.3rem] mt-[20px] mb-[10px] text-text font-bold'>{t('projects.githubRepos')}</h1>
            <div className='grid grid-cols-3 gap-[18px] pb-[15px] max-md:grid-cols-1'>
                {reposError ? (
                    <div className='border-[1.5px] border-card-border rounded-[10px_0] p-[15px] break-words relative min-h-[150px] bg-card cursor-pointer transition-all duration-300 flex flex-col hover:border-border-hover max-md:min-h-0 max-md:pb-[60px]'>
                        <p>{t('projects.error')}</p>
                    </div>
                ) : repos.length === 0 ? (
                    <div className='border-[1.5px] border-card-border rounded-[10px_0] p-[15px] break-words relative min-h-[150px] bg-card cursor-pointer transition-all duration-300 flex flex-col hover:border-border-hover max-md:min-h-0 max-md:pb-[60px]'>
                        <p>{t('projects.loading')}</p>
                    </div>
                ) : (
                    repos.map(repo => (
                        <a key={repo.name} href={repo.url} target='_blank' rel='noopener noreferrer' className='border-[1.5px] border-card-border rounded-[10px_0] p-[15px] break-words relative min-h-[150px] bg-card cursor-pointer transition-all duration-300 flex flex-col hover:border-border-hover max-md:min-h-0 max-md:pb-[60px] no-underline text-inherit'>
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
