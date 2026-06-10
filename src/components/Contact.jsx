import React from 'react'
import '../styles/contact.css'
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div className='contactArea'>
                <div className='contactForm'>
                    <p className='contactText'>
                        {t('contact.text')}
                    </p>
                    <div className='contactActions'>
                        <a href="mailto:samirrhashimov@proton.me">{t('contact.email')}</a> · <a href="https://github.com/samirrhashimov">GitHub</a>  · <a href="https://www.linkedin.com/in/samirrhashimov/">LinkedIn</a>
                    </div>
                </div>
            </div>
            {/* Comments moved to Community component */}
        </div>
    )
}

export default Contact
