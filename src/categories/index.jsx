import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import Error from '../error.jsx'
import './categories.css'

export default class Categories extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            serverError: false
        }
    }

    componentDidMount() {
        axios.get('/api/categories')
        .then(result => this.setState({categories: result.data}))
        .catch(error => this.setState({serverError: true}))
    }

    render() {
        return (
        <>
            <section className='homepage-categories'>
                       <h1 className='section-title'>Наше иконе</h1>
                        {this.state.serverError && <Error />}
                       <div className='categories-list flex'>
                        {
                        this.state.categories && 
                            this.state.categories.map(category => {
                                return (
                                    <article className='categories-list-item' key={category}>
                            <Link to={`/catalogue/${category}`}>
                                <div className='category-image-wrapper'>
                                    <img className='category-image'
                                       src={`/categories/${category}.jpg`}
                                       alt={category} 
                                    ></img>
                                    <p>{category}</p>
                                </div>
                            </Link>
                        </article>
                                )
                            })
                        }   
                    </div>
                 </section>
                 </>
        )
    }
}

