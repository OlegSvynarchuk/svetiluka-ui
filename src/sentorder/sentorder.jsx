import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Redirect, withRouter } from "react-router";
import MediaQuery from 'react-responsive'

import './sentorder.css'

class SentOrder extends Component {
    state =  {
        name: '',
        email: '',
        phone: '',
        items: null,
        id: ''
    }
    componentDidMount() {
        if(this.props.location.state) {
           this.setState({
                id: this.props.location.state.items._id,
                name:  this.props.location.state.items.name,
                email: this.props.location.state.items.email,
                phone: this.props.location.state.items.phone,
                items: this.props.location.state.items.items,
                totalPrice: this.props.location.state.items.totalPrice
            })
            this.props.history.replace({
                pathname:"/sentorder",
                state: null}) 
            }
}
    render() {
       if(!this.state.items) {
            return <Redirect to = '/' />
        } else 
        return (
         this.state.items &&   <div className='sentorder'>
              <h3>
                  Поштовани <span className='bolder'>{this.state.name}</span>,
              </h3> 
              <h3>ваша поручбина броj <span className='bolder'>{this.state.id}</span> успешно примльена.
              </h3>
              <h3>Ускоро чемо контактирати вас како би потврдили поручбину.
              </h3>
              <MediaQuery minDeviceWidth={768}>
              <table className='items'>
                <thead>
                    <tr>
                        <th>Назив</th>
                        <th>Цена</th>
                        <th>Количина</th>
                        <th>Димензия</th>
                        <th>Даска</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.items.map(item => {
                           return (
                            <tr >
                            <td>
                                <span className='basket-icon-name'>
                                    {item.name}
                            </span>
                            </td>
                            <td>
                            €{item.price}
                            </td>
                            <td>
                                {item.quantity}
                            </td>
                            <td>
                                {item.size}см
                                
                            </td>
                            <td>
                             {item.board === 'oval' ? 'Полукружна' : 'Четвртаста'}
                            </td>
                        </tr>
                          )  
                        }
                    )
                }
                </tbody>
            </table>
              </MediaQuery>
              <MediaQuery maxDeviceWidth={768}>
              <ul className='mobile-view-items'>
                {
                    this.state.items.map(item => {
                    return (
                        <div className='mobile-items-wrapper'>
                        <li className='mobile-view-item flex'>
                            <span className='item-name'>Назив</span>
                            <span className='basket-icon-name'>{item.name}</span>
                        </li>
                       <li className='mobile-view-item flex'>
                           <span className='item-name'>Цена</span>   
                           <span>€{item.price}</span>      
                        </li>
                        <li className='mobile-view-item flex'>
                             <span className='item-name'>Количина</span>
                             <span>{item.quantity}</span>     
                        </li>
                        <li className = 'mobile-view-item flex'>
                           <span className='item-name'>Димензиja</span>
                           <span>{item.size}см</span>         
                        </li>
                        <li className='mobile-view-item flex'>
                            <span className='item-name'>Даска</span>
                            <span>
                            {item.board === 'oval' ? 'Полукружна' : 'Чевтртаста'}
                            </span>
                        </li>
                    </div>    
                    )        
                    })
                }
            </ul>
              </MediaQuery>
            <div className='mobile-view-basket-footer'>
                <p className='mobile-view-total'>Укупно €{this.state.totalPrice}</p>
                <Link to ='/catalogue' className='back-btn'
                style={{width: '250px'}}
                >Вратисе у каталог</Link>
                </div>
            </div>
        )
    }
}; export default withRouter(SentOrder)
