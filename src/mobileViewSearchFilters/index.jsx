import React, {Component} from 'react'
import classNames from 'classnames'
import queryString from 'query-string'
import axios from 'axios'

import Error from '../error.jsx'



export default class MobileViewSearchFilters extends Component {
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
                    'active-category': category === this.props.activeCategory
                    
                    
                })
               return(
                
                    <li key={category}
                    className={categoryItemClasses}
                    onClick={() => this.props.setCategory(category)}
                    >
                    <span>{category}</span></li>
                  
                
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
                 <div onClick={() => this.props.fetchAllIcons()}
                    className={allCategoriesClasses}
                    >СВЕ ИКОНЕ</div>
                    {this.renderCategories(categories)}
                </div>
        )
    }
    
}
