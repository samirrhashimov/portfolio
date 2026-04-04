import React from 'react'
import '../styles/volunteering.css'
import distromatch from '../assets/images/contributions/distromatch.png'
import osGuide from '../assets/images/contributions/opensource_guide.png'

const Volunteering = () => {
  return (
    <div>
      <h1 className='aboutTypeText'>Contributions</h1>
      <div className='volunteering'>
        <div className='contributionsGrid'>
                        <a className='contributionsGridElement' href='https://github.com/github/opensource.guide/pull/3500' target='_blank' rel='noreferrer'>
                            <img className='contributionsImg' src={osGuide}></img>
                            <div className='contributionsInfo'>
                                <p className='contributionsHeader'>opensource.guide</p>
                                <p className='contributionsParagraph'>translation - Added Turkish translations to two articles</p>
                            </div>
                        </a>

                        <a className='contributionsGridElement' href='https://github.com/yusufipk/distromatch/pull/2' target='_blank' rel='noreferrer'>
                            <img className='contributionsImg' src={distromatch}></img>
                            <div className='contributionsInfo'>
                                <p className='contributionsHeader'>distromatch</p>
                                <p className='contributionsParagraph'>UI/UX update - UI/UX Modernization and Database Expansion</p>
                            </div>
                        </a>
                    </div>
      </div>
      
      <h1 className='aboutTypeText'>Volunteering</h1>
      <div className='contributions'>

      </div>
    </div>
  )
}

export default Volunteering
