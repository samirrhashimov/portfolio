import React from 'react'
import '../styles/volunteering.css'
import { useTranslation } from 'react-i18next';
import Contact from './Contact'
import Comments from './Comments'
import Contributions from './Contributions'

const Community = () => {
    const { t } = useTranslation();

    return (
        <div>
            <Contributions />
            <Contact />
            <h1 className='aboutTypeText'>{t('community.contact.comments')}</h1>
            <Comments />
        </div>
    )
}

export default Community
