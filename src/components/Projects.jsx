import React, { useState, useEffect } from 'react'
import '../styles/project.css'
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
              .slice(0, 8)
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
            <h1 className='projectTypeText'>{t('projects.webApps')}</h1>
            <div className='projectGrid'>
                <a className='gridElement' href={`https://github.com/${GITHUB_USERNAME}/blink`} target='_blank' rel='noopener noreferrer'>
                    <div className='imageContainer'
                         onMouseEnter={() => setHoveredProject('blink')}
                         onMouseLeave={() => setHoveredProject(null)}
                    >
                        <img className='gridElementImg' 
                             src={blinkImg} 
                             alt="Blink Project"
                             style={{ opacity: hoveredProject === 'blink' ? 0 : 1 }}
                        />
                        <img className='gridElementImg overlay' 
                             src={blinkHoverImg} 
                             alt="Blink Hover"
                             style={{ opacity: hoveredProject === 'blink' ? 1 : 0 }}
                        />
                    </div>
                    <p className='gridElementHeader'><b>Blink</b> - Link Sharing Platform</p>
                </a>
                <a className='gridElement' href={`https://github.com/${GITHUB_USERNAME}/bakuWeather`} target='_blank' rel='noopener noreferrer'>
                    <div className='imageContainer'
                         onMouseEnter={() => setHoveredProject('baku')}
                         onMouseLeave={() => setHoveredProject(null)}
                    >
                        <img className='gridElementImg' 
                             src={bakuWeatherImg} 
                             alt="Baku Weather Project"
                             style={{ opacity: hoveredProject === 'baku' ? 0 : 1 }}
                        />
                        <img className='gridElementImg overlay' 
                             src={bakuWeatherHoverImg} 
                             alt="Baku Weather Demo"
                             style={{ opacity: hoveredProject === 'baku' ? 1 : 0 }}
                        />
                    </div>
                    <p className='gridElementHeader'><b>bakuWeather</b> - Weather App</p>
                </a>
                <a className='gridElement' href={`https://github.com/${GITHUB_USERNAME}/brandkit`} target='_blank' rel='noopener noreferrer'>
                    <div className='imageContainer'
                         onMouseEnter={() => setHoveredProject('brandkit')}
                         onMouseLeave={() => setHoveredProject(null)}
                    >
                        <img className='gridElementImg' 
                             src={brandkitImg} 
                             alt="Brandkit Project"
                             style={{ opacity: hoveredProject === 'brandkit' ? 0 : 1 }}
                        />
                        <img className='gridElementImg overlay' 
                             src={brandkitHoverImg} 
                             alt="Brandkit Demo"
                             style={{ opacity: hoveredProject === 'brandkit' ? 1 : 0 }}
                        />
                    </div>
                    <p className='gridElementHeader'><b>brandkit</b> - NPM Icon Library</p>
                </a>
                <a className='gridElement' href={`https://github.com/${GITHUB_USERNAME}/noteify`} target='_blank' rel='noopener noreferrer'>
                    <div className='imageContainer'
                         onMouseEnter={() => setHoveredProject('noteify')}
                         onMouseLeave={() => setHoveredProject(null)}
                    >
                        <img className='gridElementImg' 
                             src={noteifyImg} 
                             alt="Noteify Project"
                             style={{ opacity: hoveredProject === 'noteify' ? 0 : 1 }}
                        />
                        <img className='gridElementImg overlay' 
                             src={noteifyHoverImg} 
                             alt="Noteify Demo"
                             style={{ opacity: hoveredProject === 'noteify' ? 1 : 0 }}
                        />
                    </div>
                    <p className='gridElementHeader'><b>Noteify</b> - Cloud Notepad</p>
                </a>
                <a className='gridElement' href={`https://github.com/${GITHUB_USERNAME}/whispen`} target='_blank' rel='noopener noreferrer'>
                    <div className='imageContainer'
                         onMouseEnter={() => setHoveredProject('whispen')}
                         onMouseLeave={() => setHoveredProject(null)}
                    >
                        <img className='gridElementImg' 
                             src={whispenImg} 
                             alt="Whispen Project"
                             style={{ opacity: hoveredProject === 'whispen' ? 0 : 1 }}
                        />
                        <img className='gridElementImg overlay' 
                             src={whispenHoverImg} 
                             alt="Whispen Demo"
                             style={{ opacity: hoveredProject === 'whispen' ? 1 : 0 }}
                        />
                    </div>
                    <p className='gridElementHeader'><b>Whispen</b> - PDF reader App</p>
                </a>
            </div>
            <h1 className='projectTypeText'>{t('projects.npmPackages')}</h1>
            <div className='npmGrid'>
                {packages.length === 0 ? (
                    <div className='npmGridElement'>
                        <p>{t('projects.noResults')}</p>
                    </div>
                ) : (
                    packages.map(pkg => (
                        <a key={pkg.name} href={pkg.url} target='_blank' rel='noopener noreferrer' className='npmGridElement' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p className='pkgName'>{pkg.name}</p>
                            <p className='pkgDescription'>{pkg.description}</p>
                            <p className='pkgVersion'>v{pkg.version}</p>
                        </a>
                    ))
                )}
            </div>
            <h1 className='projectTypeText'>{t('projects.githubRepos')}</h1>
            <div className='githubGrid'>
                {reposError ? (
                    <div className='githubGridElement'>
                        <p>{t('projects.error')}</p>
                    </div>
                ) : repos.length === 0 ? (
                    <div className='githubGridElement'>
                        <p>{t('projects.loading')}</p>
                    </div>
                ) : (
                    repos.map(repo => (
                        <a key={repo.name} href={repo.url} target='_blank' rel='noopener noreferrer' className='githubGridElement' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p className='repoName'>{repo.name}</p>
                            <p className='repoDescription'>{repo.description || 'No description'}</p>
                            <p className='repoLanguage'>{repo.language}</p>
                        </a>
                    ))
                )}
            </div>
        </div>
    )
}

export default Projects
