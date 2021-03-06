import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import classNames from 'classnames'
const queryString = require('query-string');
import MediaQuery from 'react-responsive'
import axios from 'axios'


import Pagination from '../pagination/index.jsx';
import SearchSidebar from '../searchsidebar/index.jsx'
import MobileViewSearchFilters from '../mobileViewSearchFilters/index.jsx'
import Error from '../error.jsx'
import './search.css'

class Search extends Component {

    state = {
        icons: [],
        searchWord: '',
        res: null,
        total: '',
        category: '',
        orderBy: 'asc',
        pageSize: 6,
        page: 1,
        url: '',
        serverError: false,
        loading: false
    }
    
    componentDidMount() {
        this.setState({loading: true})
        this.fetchList(`/api/${this.props.location.pathname}${this.props.location.search}`)
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.location.search !== prevProps.location.search) {
        this.setState({loading: true})
        const filter = queryString.parse(this.props.location.search).filter
        const prevFilter = queryString.parse(prevProps.location.search).filter
            if(filter != prevFilter) {
                const url = `/api/${this.props.location.pathname}${this.props.location.search}` 
                this.fetchList(url)
             } else {
                const url = `/api/${this.props.location.pathname}${this.props.location.search}`
                this.fetchList(url)
                } 
            }
        }

     fetchList = (url) => {
        axios(url)
        .then(res =>  this.setState({icons: res.data.content,
        searchWord: res.data.searchWord,
        res: res.data,
        orderBy: res.data.orderBy,
        pageSize: parseInt(res.data.pageSize), 
        total: res.data.total, 
        page: parseInt(res.data.page), 
        url: res.data.url,
        loading: false
    }) 
    )
    }

     renderCatalogue = (list) => {
        return (
            <ul className='catalogue-list'>
                {list.map(item => {
                   const board =  Object.keys(item.sizeshapes[0])[0]
                   const sizestring = item.sizeshapes[0][board][0].split(' x ').join('') 
                   const src = `${item.image}/${board}${sizestring}.jpg`   
                    return( 
                        <Link to={`/catalogue/${item.categories[0]}/${item.id}`} key={item.id}
                        className='catalogue-item-link'
                        >
                        <li className='catalogue-item'>
                         <div className='catalogue-image-wrapper'>
                           <img 
                            src={src}
                            alt={item.name}
                           className='image catalogue-image' />
                            <button className='details-button'>??????????????J??</button>
                        </div>   
                        </li>
                        <p className='icon-name'>{item.name}</p>
                    </Link>
                    )
                 })}
            </ul>
        ) }

        fetchAllIcons = () => {
            let url = new URL(window.location.href)
            let args = new URLSearchParams(url.search)
            args.delete('category');
        this.props.history.push( 
        {
            pathname: url.pathname,
            search: args.toString()
        }
        )
       
    }

        setCategory = (category) => {
            let url = new URL(window.location.href)
            let args = new URLSearchParams(url.search)
            args.delete('page')
            if(args.has('category') ) {
                args.set('category', category)
            } else {
                args.append('category', category)
            }
            
            this.props.history.push( 
                {
                    pathname: url.pathname,
                    search: args.toString()
                }
            )
       
}

        onSortChange = (e) => {
            let url = new URL(window.location.href)
            let args = new URLSearchParams(url.search)
            if(args.has('orderBy')) {
                args.set('orderBy', e.target.value)
            } else {
                args.append('orderBy', e.target.value)
            }
            
            this.props.history.push( 
            {
                pathname: url.pathname,
                search: args.toString()
            }
        )
    }

        setPageSize = (pageSize) => {
                let url = new URL(window.location.href)
                let args = new URLSearchParams(url.search)
                if(args.has('page')) {
                    args.delete('page')
                } 

                if(args.has('pageSize')) {
                    args.set('pageSize', pageSize)
                } else {
                    args.append('pageSize', pageSize)
                }
                this.props.history.push( 
                    {
                        pathname: url.pathname,
                        search: args.toString()
                    }
                )
        }

    render() {
        const activeCategory = queryString.parse(this.props.location.search).category
        const rendertotal = ()=> {
            if(this.state.res){
              return <div className='search-results-title'
              >
              <p>    
              ?????????????????? ???????????????? ???? 
              <span className='search-word'>{`'${this.state.searchWord}'`}
              </span>
              {this.state.res.category && <span> ????????????????j?? 
              <span className='search-word'>{` '${this.state.res.category}'`}</span></span>} : 
              <span className='total'>{this.state.res.total}</span>
              </p>
              </div>
            } else{
              return null
            }
          }
                 
           return (
        <div className='flex'>
            <MediaQuery minDeviceWidth={768}>
                <SearchSidebar 
                    setCategory={this.setCategory} 
                    fetchAllIcons = {this.fetchAllIcons}
                    activeCategory={activeCategory}
                    />
                </MediaQuery>    
                <div className='catalogue-wrapper'>
                {this.state.serverError && <Error />}
                {rendertotal()}
                    <div className='filters flex'>
                 <select id='sort'
                 value={this.state.orderBy}
                 onChange={this.onSortChange}
                 >
                     <option value='asc'>??????????????j ???? ?????????? (?? - ??)</option>
                     <option value='desc'>??????????????j ???? ?????????? (?? - ??)</option>
                 </select>
                    <div className='itemscount flex'>
                    <span>?????????? ???? ????????????: </span> 
                    <div className='itemscount-list'>
                        {[6, 9, 12].map((item, index) => {
                           const isLastIndex  = index === 2
                           const pageSizeClasses = classNames({
                               'itemscount-item': true,
                               'itemscount-item-active': item == this.state.pageSize,
                            })
                           return(<div key={item}>
                               <div 
                               className={pageSizeClasses}
                               onClick={() => this.setPageSize(item)}
                               >{item}
                               </div>
                            
                               </div>
                               )
                            })}
                            </div>   
                            </div> 
                    <MediaQuery maxDeviceWidth={768}>
                       <MobileViewSearchFilters
                         setCategory={this.setCategory} 
                         fetchAllIcons = {this.fetchAllIcons}
                         activeCategory={activeCategory}
                       />
                    </MediaQuery>
                 </div>
                 {this.state.loading && <div className='empty-page'></div>}
                  {this.renderCatalogue(this.state.icons)}
                { (this.state.icons.length > 0) && <Pagination 
                  total={this.state.total}
                  pageSize={this.state.pageSize}
                  currentPage={this.state.page}
                  />}
                </div>
            </div>
            );
    }
}

export default withRouter(Search);


