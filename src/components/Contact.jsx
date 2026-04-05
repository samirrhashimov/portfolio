import React from 'react'
import '../styles/contact.css'
import Comments from './Comments'

const Contact = () => {
    return (
        <div>
            <div className='contactArea'>
                <div className='contactForm'>
                    <p className='contactText'>
                        Have a project in mind or just want to say hi? I'd love to hear from you..
                    </p>
                    <div className='contactActions'>
                        <a href="mailto:samirrhashimov@proton.me">Send Email</a> · <a href="https://github.com/samirrhashimov">GitHub</a>  · <a href="https://www.linkedin.com/in/samirrhashimov/">LinkedIn</a>
                    </div>
                </div>
            </div>
            <h1 className='aboutTypeText'>Comments</h1>
            <Comments />
        </div>
    )
}

export default Contact
