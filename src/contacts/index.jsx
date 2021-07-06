import React from 'react'
import './contacts.css'





export default function Contacts() {
  
    return (
        
         <div className='contacts-wrapper'>
              <div className='contacts'>
                    <h2>Контакт</h2>
                    <p>
                       <span className='contact-item'>email:</span>
                        info@svetilukaicons.com
                    </p>
                    <p><span className='contact-item'>телефон:</span> +381 064 715 44 22, +381 062 562 35 11</p>
                    <p><span className='contact-item'>viber:</span> +381 062 562 35 11</p>
                    <p><span className='contact-item'>skype:</span> svetilukaicons</p>
                </div>
         </div>   
        
    )
}
