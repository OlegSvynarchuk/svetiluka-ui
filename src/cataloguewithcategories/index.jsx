import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'
import classNames from 'classnames'
import MediaQuery from 'react-responsive'

import CatalogueHeader from '../catalogueheader/index.jsx';
import Sidebar from '../sidebar/index.jsx';
import Pagination from '../pagination/index.jsx'
import MobileViewFilters from '../mobileViewFilters/index.jsx';
import Error from '../error.jsx'





class CatalogueCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            icons: [],
            orderBy: 'asc',
            pageSize: 6,
            total: null,
            page: 1,
            url: '',
            serverError: false,
            loading: false
        }
    }

    params = this.props.match.params.category

    componentDidMount() {
        this.setState({loading: true})
        const url = this.props.location.search ? `/api/catalogue/${this.params}${this.props.location.search}` : `/api/catalogue/${this.params}`
        this.fetchList(url)
        
    }

    fetchList = (url) => {
        axios.get(url)
        .then(response => this.setState({icons: response.data.content, 
            orderBy: response.data.orderBy, 
            pageSize: parseInt(response.data.pageSize), 
            total: response.data.total, 
            page: parseInt(response.data.page), 
            url: response.data.url,
            loading: false
        })).catch(error => this.setState({serverError: true}))
    }

    componentDidUpdate(prevProps) {
        
        if(this.props.location !== prevProps.location) {
            this.setState({loading: true})
            const {pathname, search} = this.props.location 
            const url = search ? `${pathname}${search}` : pathname
            this.fetchList(`/api/${url}`)
        }
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
   if((args.has('pageSize')) && args.has('page')) {
       args.set('pageSize', pageSize)
       args.set('page', 1)
   } 

   if(args.has('pageSize')) {
       args.set('pageSize', pageSize)
   }
   
   else {
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
    return (
        <div className='flex'>
            <MediaQuery minDeviceWidth={768}>
                <Sidebar activeCategory={this.props.match.params.category} />
            </MediaQuery>
            
            <div className='catalogue-wrapper'>
            <CatalogueHeader title = {this.props.match.params.category} />
            <div className='catalogue'>
            <div className='filters flex'>
                 <select id='sort'
                 value={this.state.orderBy}
                 onChange={this.onSortChange}
                 >
                     <option value='asc'>Сортираj по имену (А - Ш)</option>
                     <option value='desc'>Сортираj по имену (Ш - А)</option>
                 </select>
                    <div className='itemscount flex'>
                    <span>Икона на страни: </span> 
                    <div className='itemscount-list'>
                    {[6, 9, 12].map((item, index) => {
                            const isLastIndex  = index === 2
                            const pageSizeClasses = classNames({
                                'itemscount-item': true,
                                'itemscount-item-active': item == this.state.pageSize,
                               
                            })
                            return(<div key={item}><div 
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
                 <MobileViewFilters activeCategory={this.props.match.params.category} />       
            </MediaQuery>
        </div>
        {this.state.serverError && <Error />}
        {this.state.loading && <div className='empty-page'></div>}
            {renderCatalogue(this.state.icons)}
            <Pagination
            total={this.state.total}
            pageSize={this.state.pageSize}
            currentPage={this.state.page}
            />
            </div>
            </div>
        </div>
        
    )
}
    
}

const renderCatalogue = (list) => {
    return (
        <ul className='catalogue-list'>
            {list.map(item => {
                  const board =  Object.keys(item.sizeshapes[0])[0]
                  const sizestring = item.sizeshapes[0][board][0].split(' x ').join('') 
                  const src = `${item.image}/${board}${sizestring}.jpg` 
                return( 
                    <Link key ={item.id} to={`/catalogue/${item.categories[0]}/${item.id}`} key={item.id}
                    className='catalogue-item-link'
                    >
                    <li className='catalogue-item'
                    >
                     <div className='catalogue-image-wrapper'>
                        <img src={src}
                        alt={item.name} 
                        className='image catalogue-image'
                        />
                        <button className='details-button'>ДЕТАЉНИJЕ</button>
                    </div>   
                    </li>
                    <p className='icon-name'>{item.name}</p>
                    
                </Link>
                    
                    
                    
                )
             })}
        </ul>
    )
}; export default withRouter(CatalogueCategory)
