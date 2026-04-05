import React from 'react'
import Giscus from '@giscus/react'

const Comments = () => {
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
            theme="https://raw.githubusercontent.com/samirrhashimov/portfolio/main/public/giscus-theme.css"
            lang="en"
            loading="lazy"
        />
    )
}

export default Comments
