import React from 'react'
import '../styles/volunteering.css'
import distromatch from '../assets/images/contributions/distromatch.png'
import osGuide from '../assets/images/contributions/opensource_guide.png'
import { useTranslation } from 'react-i18next';

const Contributions = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className='aboutTypeText'>{t('community.contributions.title')}</h1>
      <div className='contributions'>
        <div className='contributionsGrid'>
            <a className='contributionsGridElement' href='https://github.com/github/opensource.guide/pull/3500' target='_blank' rel='noreferrer'>
                <img className='contributionsImg' src={osGuide}></img>
                <div className='contributionsInfo'>
                    <p className='contributionsHeader'>opensource.guide</p>
                    <p className='contributionsParagraph'>{t('community.contributions.osGuide')}</p>
                </div>
            </a>

            <a className='contributionsGridElement' href='https://github.com/yusufipk/distromatch/pull/2' target='_blank' rel='noreferrer'>
                <img className='contributionsImg' src={distromatch}></img>
                <div className='contributionsInfo'>
                    <p className='contributionsHeader'>distromatch</p>
                    <p className='contributionsParagraph'>{t('community.contributions.distromatch')}</p>
                </div>
            </a>
        </div>
      </div>
    </div>
  )
}

export default Contributions
