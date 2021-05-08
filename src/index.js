
import React from 'react'
import ReactDOM from 'react-dom'
import {Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory';

import App from './app.jsx'
import '../src/style.css'
import ScrollToTop from './scrollToTop.jsx'



const history = createHistory()

ReactDOM.render(
<Router history={history} >
    <ScrollToTop />
    <App />
</Router>    , 
document.getElementById('contents'))