import React from 'react'
import { FaEnvelope, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();
    const contactLinks = [
        { label: t('contact.emailLabel'), value: 'samirrhashimov@proton.me', href: 'mailto:samirrhashimov@proton.me', icon: FaEnvelope },
        { label: 'LinkedIn', value: 'linkedin.com/in/samirrhashimov', href: 'https://www.linkedin.com/in/samirrhashimov/', icon: FaLinkedin },
        { label: 'Instagram', value: '@samirrhashimov', href: 'https://www.instagram.com/samirrhashimov/', icon: FaInstagram },
    ]

    return (
        <div>
            <h1 className='font-[Inter] text-[1.3rem] my-[10px] text-text font-bold'>{t('contact.title')}</h1>
            <div className='grid grid-cols-3 gap-[14px] mt-[20px] mb-[50px] max-md:grid-cols-2 max-sm:grid-cols-1'>
                {contactLinks.map(link => {
                    const Icon = link.icon
                    const isEmail = link.href.startsWith('mailto:')
                    return (
                        <a key={link.label} href={link.href} target={isEmail ? undefined : '_blank'} rel={isEmail ? undefined : 'noreferrer'} className='block min-h-[150px] border border-card-border bg-card rounded-xl p-[16px] no-underline text-text transition-colors duration-200 hover:border-border-hover'>
                            <div className='flex h-[42px] w-[42px] items-center justify-center rounded-[9px] border border-card-border text-secondary'>
                                <Icon className='text-[1.15rem]' />
                            </div>
                            <p className='font-[Inter] text-[1rem] font-bold mt-[18px] mb-[4px]'>{link.label}</p>
                            <p className='font-[Inter] text-[0.85rem] text-secondary break-words'>{link.value}</p>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

export default Contact
