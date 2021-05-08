import React from 'react'
import {Link} from 'react-router-dom'
import Header from '../header/index.jsx'
import Footer from '../footer/index.jsx'
import SentOrder from '../sentorder/sentorder.jsx'

export default function Sentorderpage() {
    return (
        <div>
            <Header></Header>
                <SentOrder />
           <Footer></Footer>
        </div>
    )
}
