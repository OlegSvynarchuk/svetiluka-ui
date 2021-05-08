import React from 'react'

export default function IconImage ({src, alt}) {
    
    
        return (
             <div className='icon-page-image-wrapper'>
                <img src={src} className='icon-page-image'
                alt={alt}
                 />
            </div>
        )
    }

