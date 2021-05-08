import React from 'react'
import './pagenavigation.css'
export default function PageNavigation({children}) {
    return (
        <div className = 'page-navigation'>
            {children}
        </div>
    )
}
