import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import axios from 'axios'

import Error from '../error.jsx'
import './sidebar.css'

export default class Sidebar extends Component {
    state = {
        categories: [],
        serverError: false
    }
    componentDidMount() {
        axios.get('/api/categories')
        .then(result => this.setState({categories: result.data}))
        .catch(error => this.setState({serverError: true}))
    }

    renderCategories = (list) => {
       return (<ul className='categories'>
           {list.map(category => {
                const categoryItemClasses = classNames({
                    'categories-item': true,
                    'active-category': category == this.props.activeCategory
                })
               return(
                <Link to={`/catalogue/${category}`} key={category}>
                    <li className={categoryItemClasses} 
                    key={category}>
                    <span>{category}</span></li>
                </Link>   
            )
           })}
       </ul>)
        
    }


    render() {
        const {categories} = this.state
        const allCategoriesClasses = classNames({
            'categories-item': true,
            'all': true,
            'active-category': !this.props.activeCategory
        })
        return (
            <div className='sidebar'>
            {this.state.serverError && <Error />}
                 <h3 className='categories-title'>Категориjе</h3>
                  <Link 
                    style={{display:'block'}}
                    className={allCategoriesClasses}
                    to='/catalogue'>
                        Све Иконе
                  </Link>
                    {this.renderCategories(categories)}
                </div>
        )
    }
    
}
