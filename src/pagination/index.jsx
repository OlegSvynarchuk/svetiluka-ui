import React from 'react';
import classNames from 'classnames'
import {withRouter} from 'react-router'

import './pagination.css'

const Pagination = ({total, pageSize, currentPage, history}) => {
   
     function range(start, end) {
        return [...Array(end).keys()].map(el => el + start)
    }
    
    function setPage(page) {
        let url = new URL(window.location.href)
        let args = new URLSearchParams(url.search)
        if(args.has('page')) {
            args.set('page', page)
        } else {
            args.append('page', page)
        } 

        history.push( 
            {
                pathname: url.pathname,
                search: args.toString()
            }
        )
        
    }
    const limit = total / parseInt(pageSize)
    const pages = range(1, Math.ceil(limit))    
    
    return (
        (total && (total > pageSize))  && <ul className='pagination'>
           {pages.map(page => {
               const pageClasses = classNames({
                   'page-item': true,
                   'active-page': page == currentPage
               })
               return(<li key={page} className={pageClasses}
               onClick={()=>setPage(page)}
               >{page}
               </li>)
           })}
        </ul>
          ); 
        }

export default withRouter(Pagination);
