import React from 'react'
import './catalogueheader.css'

export default function CatalogueHeader({title}) {
    const headerTitle = title ? title : 'наше иконе'
    return (
        <div className='catalog-header'>
            <h3 className='catalog-header-title'>
               {headerTitle}
            </h3>
        </div>
    )
}
