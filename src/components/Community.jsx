import React from 'react'
import { useTranslation } from 'react-i18next';
import Contact from './Contact'

const Community = () => {
    const { t } = useTranslation();

    return (
        <div>
            <Contact />
        </div>
    )
}

export default Community
