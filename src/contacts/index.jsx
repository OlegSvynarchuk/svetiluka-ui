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
                    <p><span className='contact-item'>телефон:</span> +381 123 45 67, +381 123 45 67 </p>
                    <p><span className='contact-item'>viber:</span> +381 123 45 67</p>
                    <p><span className='contact-item'>skype:</span> svetilukaicons</p>
                </div>
         </div>   
        
    )
}
