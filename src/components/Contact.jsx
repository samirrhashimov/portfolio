import React from 'react'
import '../styles/contact.css'
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1 className='aboutTypeText'>{t('contact.title')}</h1>
            <div className='contactArea'>
                <div className='contactForm'>
                    <p className='contactText'>
                        {t('community.contact.text')}
                    </p>
                    <div className='contactActions'>
                        <a href="mailto:samirrhashimov@proton.me">{t('community.contact.email')}</a> · <a href="https://github.com/samirrhashimov">GitHub</a>  · <a href="https://www.linkedin.com/in/samirrhashimov/">LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
