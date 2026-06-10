import React from 'react'
import '../styles/volunteering.css'
import certificateImg from '../assets/images/honors/certificate-of-appreciation-international-law.pdf.jpg'
import { useTranslation } from 'react-i18next';

const Honors = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className='aboutTypeText'>{t('community.honors.title')}</h1>
      <div className='contributions'>
        <div className='contributionsGrid'>
          <a className='contributionsGridElement' href={certificateImg} target='_blank' rel='noreferrer'>
            <img className='contributionsImg' src={certificateImg} alt={t('community.honors.certificate.header')}></img>
            <div className='contributionsInfo'>
              <p className='contributionsHeader'>{t('community.honors.certificate.header')}</p>
              <p className='contributionsParagraph'>{t('community.honors.certificate.paragraph')}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Honors
