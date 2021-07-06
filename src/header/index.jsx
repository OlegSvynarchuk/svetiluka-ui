import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {Link, NavLink} from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import axios from 'axios'
import classNames from 'classnames'

import Error from '../error.jsx'
import './header.css'

class Header extends Component{
   state = {
           searchterm: '',
           total: '',
           showmenu: false, 
           serverError: false
       }
   

   componentDidMount() {
    axios.get('/api/cart')
    .then(res => {
        if(res.data)
    this.setState({total: res.data.length})
    }).catch(error => this.setState({serverError: true}))
   }

    componentDidUpdate(prevProps) {
    if(prevProps.items !== this.props.items) {
       this.setState({total: this.props.items.length}) 
    }
}   

   onSearchSubmit = (e) => {
        e.preventDefault() 
            if(this.state.searchterm.trim()) {
                this.props.history.push({
                pathname: '/search',
                search: `filter=${this.state.searchterm}`
        })
    }
}

    onSearchChange = (e) => {
        this.setState({searchterm: e.target.value})
    }

    toggleMenu = () => {
        this.setState((state) => ({showmenu: !state.showmenu}))
    }

   render() {
      const menuClasses = classNames({
          'navigation-list': true,
          'flex': true,
          'show-menu': this.state.showmenu
      })
      
    return (
        <>
          <header>
          {this.state.serverError && <Error />}
            <div className='top-nav flex'>
               <div className='logo'>
                      <img src='/images/logo.png'></img> 
                      <div>
                      <Link to ='/'>
                          <h2 className='logo-title'>Свети лука</h2>
                          <p className='logo-description'>Иконописачка радионица</p>
                      </Link>
                      </div>  
                     </div>
                     <div className='topnav-right flex'>
                     <form className='search-form'
                      onSubmit={this.onSearchSubmit}
                     >
                     <button className='search-button' type='submit'>
                        <i className="fas fa-search"></i>
                     </button>    
                     <input type='text' 
                      placeholder='Претражи икону'
                      className='search-input'
                      onChange={this.onSearchChange}
                      value={this.state.searchterm}
                      ></input> 
                    </form>    
                    <div className='order-icon-button'>
                        <HashLink to='/conditions#orderIconForm'>Поручити Икону</HashLink>
                     </div>  
                       <div className='cart-container' title='basket'>
                        <Link to='/basket'>
                          <i className="fa fa-suitcase" aria-hidden="true"></i>
                            <span>{this.state.total}</span> 
                         </Link>
                    </div>
                    </div>
                    </div>
                        <div className='mobile-view-menu'>
                            <button
                            onClick={() => this.toggleMenu()}
                            >{this.state.showmenu ? 
                             <i className="fas fa-times"></i>   
                            :<i className="fas fa-bars"></i> 
                            }    
                            </button>
                             <div className= 'mobile-view-cart-container' >
                                <Link to='/basket'>
                                    <i className="fa fa-suitcase" aria-hidden="true"></i>
                                    <span>{this.state.total}</span> 
                                </Link>
                            </div>
                            </div> 
                    
                                <ul className={menuClasses}>
                                    <li><NavLink exact to='/' activeClassName="active-link">почетна</NavLink></li>
                                    <li><NavLink to='/catalogue' activeClassName="active-link">иконе</NavLink></li>
                                    <li><NavLink to='/conditions' activeClassName="active-link">како наручити</NavLink></li>
                                    <li><NavLink to='/contacts' activeClassName="active-link">контакт</NavLink></li>
                                </ul>
                 </header>              
        </>
    )
   }
} export default withRouter(Header)
