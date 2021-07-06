import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {withRouter} from 'react-router'
import MediaQuery from 'react-responsive'
import Error from '../error.jsx'
import './basket.css'


class Basket extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        address: '',
        message: '',
        sent: false,
        errors: null,
        serverError: false
    }

  

    

    convertArrayToObject = (array, key) => {
        const initialValue = {}
        return array.reduce((obj, item) => {
            return {
                ...obj, 
                [item[key]]: item,
            }
        }, initialValue)
    }

    renderItems(list, totalPrice) {
        return (
        <>
    <MediaQuery minDeviceWidth={768}>
    <div className='items-wrapper'>
            <table className='items'>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Назив</th>
                        <th>Цена</th>
                        <th>Количина</th>
                        <th>Димензиjа</th>
                        <th>Даска</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map(item => {
                        return (
                            <tr key={item.id}>
                            <td className='deletebutton-cell' onClick={() => this.props.removeItem(item.id, item.image, item.price)}>
                            <div className='deletebutton-circle'>
                            <span><i className="fa fa-times" aria-hidden="true"></i>
                            </span>
                            </div>
                            </td>
                            <td className='image-cell'>
                            <div >
                                <img 
                                className='basket-image'
                                src={item.image}
                                alt={item.name}
                             />
                            </div>
                            </td>
                            <td>
                                <span className='basket-icon-name'><Link to={{
                                    pathname: `/catalogue/${item.categories[0]}/${item.id}`,
                                    state: {
                                        image: item.image,
                                        price: item.price,
                                        board: item.board,
                                        size: item.size
                                    }
                                }}>{item.name}</Link></span>
                            </td>
                            <td>
                              €{item.price}
                            </td>
                            <td className='quantity-buttons-cell'>
                                <div className='quantity-buttons-wrapper'>
                                    <span> <button onClick = 
                                           {() => this.props.plusBasketItem(item.id, item.image, item.price)}
                                           >+</button></span>
                                    <span>{item.quantity}</span>  
                                    <span>
                                           <button onClick =
                                           {() => this.props.minusBasketItem(item.id, item.image, item.price)}
                                           >-</button>
                                    </span>
                            </div>
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
            <div className='total-price'>
                <p>Укупно    €{totalPrice}</p>
                <button 
                style={{width: '200px',
                        
            }}
                className='back-btn'
                onClick={() => this.props.clearBasket()} 
                >очисти корпу</button>
                </div>
            </div>
    </MediaQuery>    
    {/* Mobile view basket */}
    <MediaQuery maxDeviceWidth={768}>
      <div className='mobile-view-basket'>
            <ul className='mobile-view-items'>
                {
                    list.map(item => {
                        return (
                        <div className='mobile-items-wrapper' key={item.id}>
                        <li className='mobile-view-item'>
                            <button className='remove-icon-button'
                            onClick={() => this.props.removeItem(item.id, item.image, item.price)}
                            >
                            <span><i className="fa fa-times-circle-o" aria-hidden="true"></i></span>    
                                ИЗБРИШИ
                            </button>
                        </li>
                        <li className='mobile-view-item flex'>
                            <span className='item-name'>Назив</span>
                            <span className='basket-icon-name'><Link to={{
                                    pathname: `/catalogue/${item.categories[0]}/${item.id}`,
                                    state: {
                                        image: item.image,
                                        price: item.price,
                                        board: item.board,
                                        size: item.size
                                    }
                                    
                                    }}>{item.name}</Link></span>
                        </li>
                        <li className='mobile-view-item center'>
                         <div className='image-cell'>
                         <img 
                                className='basket-image'
                                src={item.image}
                        /> 
                         </div>   
                         </li>
                        <li className='mobile-view-item flex'>
                           <span className='item-name'>Цена</span>   
                           <span>€{item.price}</span>      
                        </li>
                        <li className='mobile-view-item flex'>
                             <span className='item-name'>Количина</span>
                             <span className='quantity-buttons-wrapper'>
                             <span> <button onClick = 
                                           {() => this.props.plusBasketItem(item.id, item.image, item.price)}
                                           >+</button></span>
                                    <span>{item.quantity}</span>  
                                    <span>
                                           <button onClick =
                                           {() => this.props.minusBasketItem(item.id, item.image, item.price)}
                                           >-</button>
                                    </span>      
                             </span>       
                        </li>
                        <li className = 'mobile-view-item flex'>
                           <span className='item-name'>Димензиja</span>
                           <span>{item.size}см</span>         
                        </li>
                        <li className='mobile-view-item flex'>
                            <span className='item-name'>Даска</span>
                            <span>
                            {item.board === 'oval' ? 'Полукружна' : 'Четвртаста'}
                            </span>
                        </li>
                    </div>    
                    )        
                    })
                }
            </ul>
            <div className='mobile-view-basket-footer'>
                <p className='mobile-view-total'>Укупно    €{totalPrice}</p>
                <button 
                style={{width: '200px'}}
                className='back-btn'
                onClick={() => this.props.clearBasket()} 
                >очисти корпу</button>
                </div>
      </div>
    </MediaQuery>
    </>
        )
     }

    clearData = () => {
        this.setState({
        name: '',
        email: '',
        address: '',
        message: '',
        phone: ''
        })
    }


    onHandleSubmit = (e) => {
        e.preventDefault()
        const { name, email, address, phone, message} = this.state
        const {items} = this.props
        const totalPrice = this.props.getTotalPrice()
        const requestOptions = {
                name: name,
                email: email,
                address: address,
                items: items,
                phone: phone,
                message: message,
                totalPrice: totalPrice
            }
        
            axios.post('/api/basket', requestOptions)
                .then((res) => {
                if(res.status === 200) {
                    this.props.clearBasket()
                    this.props.history.push({
                        pathname:"/sentorder",
                        state:{
                            items: res.data
                         }
                       });
                
            }    
        }).catch(error => {
            if(error.response.status === 500) {
                this.setState({serverError: true})
            } else {
                console.log(error.response.data.errors)
                const errors = this.convertArrayToObject(error.response.data.errors, 'param')
                
        this.setState({errors}) 
            }
           }
    )
}

    onHandleChange = (e) => {
        const name = e.target.name
        this.setState({
            [name]: e.target.value
        })
    }
    
    render() {
        const totalPrice = this.props.getTotalPrice()
        if(this.props.loading) {return <div className='empty-page'></div>}
        if(this.props.items.length === 0) {return <div className='empty-basket'>
            <p>ваша корпа jе празна</p>
        </div>}
        
       return (
        <>   
        <div className='basket-page'>
            {(this.state.serverError || this.props.error) && <Error />}
            <div className='basket'>
            {this.renderItems(this.props.items, totalPrice)}
            </div> 
        <main className='basket-form-wrapper flex'>
        <section className='basket-form-section'>
        <h2 className='form-title'>Ваше подаци</h2> 
        <form className='basketForm' onSubmit={this.onHandleSubmit}>
            <div className='form-field'>
            <label htmlFor='name'>Име *</label>
                <input id='name' 
                placeholder='Име'
                name='name' 
                type='text'
                value={this.state.name}
                onChange={this.onHandleChange}
             />
             {this.state.errors && this.state.errors.name && <div className='basketform-error'>{this.state.errors.name.msg}</div>}
            </div>
             <div className = 'form-field'>
             <label htmlFor='email'>Електронска пошта</label>
             <input id='email' 
                placeholder='Меjл'
                name='email' 
                type='text'
                value={this.state.email}
                onChange={this.onHandleChange}/>
             {this.state.errors && this.state.errors.email && <div className='basketform-error'>{this.state.errors.email.msg}</div>}
             </div> 
             <div className='form-field'>
             <label htmlFor='phone'>Телефон *</label>
                <input id='phone' 
                    placeholder='Телефон'
                    name='phone' 
                    type='text'
                    value={this.state.phone}
                    onChange={this.onHandleChange}/>
                    {this.state.errors && this.state.errors.phone && <div className='basketform-error'>{this.state.errors.phone.msg}</div>}
             </div>
             <div className='form-field'>
             <label htmlFor='address'>Адреса</label>
                <input id='address' 
                    placeholder='Адреса'
                    name='address' 
                    type='text'
                    value={this.state.address}
                    onChange={this.onHandleChange}/>
             </div>
                <label htmlFor='message'>Порука</label>
                    <textarea id='message' name='message' 
                    placeholder='Напишите поруку'
                    rows='5' 
                    value={this.state.message}
                    onChange={this.onHandleChange}/>
            
            <div className='total-price total-price-checkout'><span>Укупно за плачанье </span>  <span>€{totalPrice}</span></div>
            {this.state.errors && <div className='basketform-error'>унесите исправне подаци</div>}
            <button 
            className='back-btn' 
            type='submit'>
                Потврди
            </button>
        </form>
        </section>
        <section className='conditions-section'>
            <div className='rule'>
               <h3>Израда</h3> 
               <p>Израда иконе може траjати од 5 до 15 дана
                   у зависности од димензиjе и компликованости 
                   композициjе.
               </p>
            </div>
            <div className='rule'>
                <h3>Плачанье</h3>
                <p>Све иконе плачаjусе поузечем након испоруке
                    код купца. Ако желите да платите икону на банкарски
                    рачун можете накнадно контактирати нас путем меjла.
                    Иконе можете да платите у еврима или у динарском еквиваленту.
                </p>
            </div>
            <div>
                <h3>Достава</h3>
                <p>Све иконе испоручуюсе путем доставе курирском службом. 
                    Пре испоруке свака икона пакуjе се у одговараjуче заштитно
                    пакованье како би се избегла оштеченьа. Трошкове доставе 
                    преузима поручилац. 
                </p>
            </div>
        </section>
        </main>
    </div>
</>
)  
}
   
}; export default withRouter(Basket)
