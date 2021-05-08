import React from 'react'
import {Link} from 'react-router-dom'

import './footer.css'

export default function Footer() {
    return (
        <>
        <footer className='flex'>
                    <div className='footer-left'>
                        <h4> Радионица Свети лука</h4>
                        <p>&copy; Олег Свинарчук 2020</p>
                    </div>
                    <ul className='footer-links flex'>
                        <li><Link to='/'>почетна</Link></li>
                        <li><Link to='/catalogue'>иконе</Link></li>
                        <li><Link to='/conditions'>како наручити</Link></li>
                        <li><Link to='/contacts'>контакт</Link></li>
                    </ul>
                    <div className='social flex'>
                        <span>
                        <i className="fa fa-facebook-square" aria-hidden="true"></i>
                        </span>
                        <span>
                        <i className="fab fa-instagram-square"></i>
                        </span>
                        <span>
                        <i className="fas fa-at"></i>
                        </span>
                    </div>
            </footer>
        </>
    )
}
