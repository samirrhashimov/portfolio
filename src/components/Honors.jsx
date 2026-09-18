import React from 'react'
import certificateImg from '../assets/images/honors/certificate-of-appreciation-international-law.pdf.jpg'
import { useTranslation } from 'react-i18next';

const Honors = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className='font-[Inter] text-[1.3rem] my-[10px] text-text'>{t('community.honors.title')}</h1>
      <div className='contributions'>
        <div className='grid grid-cols-[repeat(2,minmax(220px,1fr))] max-[900px]:grid-cols-1 gap-[18px] pb-[20px] w-full'>
          <a className='flex flex-row border border-card-border bg-card rounded-[10px_0] no-underline text-inherit overflow-hidden transition-all duration-200 hover:border-text max-md:flex-col max-md:rounded-[10px]' href={certificateImg} target='_blank' rel='noreferrer'>
            <img className='max-w-[250px] h-[130px] object-cover border-r border-card-border max-md:max-w-full max-md:h-auto max-md:rounded-t-[10px] max-md:border-r-0 max-md:border-b max-md:border-card-border' src={certificateImg} alt={t('community.honors.certificate.header')}></img>
            <div className='mx-[10px] relative w-full max-md:my-[10px] max-md:px-[10px] max-md:pb-[15px]'>
              <p className='text-[1rem] font-[Inter] font-bold mt-[5px] text-text'>{t('community.honors.certificate.header')}</p>
              <p className='text-[0.9rem] font-[Inter] text-secondary mt-[5px]'>{t('community.honors.certificate.paragraph')}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Honors
