import React from 'react'
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1 className='font-[Inter] text-[1.3rem] my-[10px] text-text'>{t('contact.title')}</h1>
            <div className='w-full flex justify-center mt-[30px] mb-[50px]'>
                <div className='contactForm'>
                    <div className='flex justify-center items-center mt-[15px] gap-[10px] max-[480px]:flex-row max-[480px]:gap-[15px] max-[480px]:text-center text-secondary font-[Outfit]'>
                        <a href="mailto:samirrhashimov@proton.me" className='no-underline bg-badge border border-badge-border rounded-[4px] py-[3px] px-[10px] text-text font-[Outfit] hover:bg-accent-hover transition-all duration-300'>{t('community.contact.email')}</a> · <a href="https://github.com/samirrhashimov" className='no-underline text-secondary hover:text-text font-[Outfit]'>GitHub</a>  · <a href="https://www.linkedin.com/in/samirrhashimov/" className='no-underline text-secondary hover:text-text font-[Outfit]'>LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
