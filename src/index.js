
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter } from 'react-router-dom'


import App from './app.jsx'
import '../src/style.css'
import ScrollToTop from './scrollToTop.jsx'





ReactDOM.render(
<BrowserRouter>
    <ScrollToTop />
    <App />
</BrowserRouter>    , 
document.getElementById('contents'))