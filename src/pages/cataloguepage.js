import React from 'react'
import Catalogue from '../catalogue/catalogue.jsx'
import Header from '../header/index.jsx'
import CatalogueHeader from '../catalogueheader/index.jsx'
import Sidebar from '../sidebar/index.jsx'
import Footer from '../footer/index.jsx'


export default function Cataloguepage() {
    return (
        <div>
            <Header></Header>
            <Catalogue /> 
            <Footer></Footer>
        </div>
    )
}
