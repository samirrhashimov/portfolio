import React from 'react'
import { useTranslation } from 'react-i18next';
import Contact from './Contact'
import Comments from './Comments'
import Contributions from './Contributions'
import Honors from './Honors'

const Community = () => {
    const { t } = useTranslation();

    return (
        <div>
            <Contributions />
            <Honors />
            <Contact />
            <h1 className='font-[Inter] text-[1.3rem] my-[10px] text-text'>{t('community.contact.comments')}</h1>
            <Comments />
        </div>
    )
}

export default Community
