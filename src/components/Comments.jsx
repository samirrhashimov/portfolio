import React, { useEffect, useState } from 'react'
import Giscus from '@giscus/react'

const Comments = () => {
    const [theme, setTheme] = useState(() => {
        if (typeof document === 'undefined') return 'light'
        return document.body.classList.contains('dark-theme') ? 'dark' : 'light'
    })

    useEffect(() => {
        if (typeof document === 'undefined') return
        const observer = new MutationObserver(() => {
            const isDark = document.body.classList.contains('dark-theme')
            setTheme(isDark ? 'dark' : 'light')
        })
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
        return () => observer.disconnect()
    }, [])

    return (
        <Giscus
            id="comments"
            repo="samirrhashimov/portfolio"
            repoId="R_kgDOOt1oCQ"
            category="General"
            categoryId="DIC_kwDOOt1oCc4C6G4q"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={theme}
            lang="en"
            loading="lazy"
        />
    )
}

export default Comments
