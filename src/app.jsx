import React, {Component, Fragment} from 'react'
import {Switch, Route} from 'react-router-dom'
import {withRouter} from 'react-router'
import axios from 'axios'

import Cataloguepage from './pages/cataloguepage.js'
import Iconpage from './pages/iconpage.js'
import Basketpage from './pages/basketpage.js'
import Homepage from './pages/homepage.js'
import Sentorderpage from './pages/sentorder.js'
import Search from './search/search.jsx'
import Categoriespage from './pages/categoriespage.js'
import SentMailPage from './pages/sentmail.js'
import notfound from './notfound.jsx'
import ConditionsPage from './pages/conditionspage.js'
import Contactspage from './pages/contactspage.js'


class App extends Component {
    
        state = {
            basket: [],
            orderBy: 'asc',
            searchterm: '',
            loading: false,
            serverError: false
         }
   
    
    componentDidMount() {
        this.setState({loading: true})
        axios.get('/api/cart')
        .then(res => {
            if(res.data)
          this.setState({basket: res.data, loading: false})
    }).catch(error => this.setState({serverError: true}))
}
    

getTotalPrice = () => {
        let totalAmount = 0;
        this.state.basket.forEach(item => {
            let itemTotalAmount;
            itemTotalAmount = item.quantity * item.price
            totalAmount += itemTotalAmount
        })
        return totalAmount
    }

    

plusBasketItem = (id, image, price ) => {
    const basket = this.state.basket
    const updatedBasket = basket.map(icon => {
        if(icon.id === id && icon.image === image && icon.price === price) {
            return ({...icon, quantity: icon.quantity + 1})
        } return icon
    } ) 
        axios.post('/api/cart', updatedBasket)
        .then(res => this.setState({basket: res.data}))
 }

minusBasketItem = (id, image, price) => {
const cartItem = this.state.basket.find(item => this.isIconInBasket(item.id, item.image, item.price))
        if (cartItem.quantity === 1) {
          this.removeItem(id, image, price)
        } else {
            const updatedCart = this.state.basket.map(icon => {
                if(this.isIconInBasket(icon.id, icon.image, icon.price)) {
                    return ({...icon, quantity: icon.quantity - 1})
                } else {
                    return icon
                }
            })
            axios.post('/api/cart', updatedCart).then(
                res => this.setState({basket: res.data})
            )
        }
    }

    addToBasket = (icon) => {
        this.setState({loading: true})
    const inBasket = this.isIconInBasket(icon.id, icon.image, icon.price )
        if(!inBasket) {
           const cart = [...this.state.basket, {...icon, quantity: 1}]
           axios.post('/api/cart', cart)
           .then(res => this.setState({basket: res.data, loading: false}))  
        }
    }

clearBasket = () => {
    axios.post('/api/cart', []).then(res => 
        this.setState({basket: res.data}))
        .catch(error => this.setState({serverError: true}))
}

removeItem = (id, image, price) => {
    const basket = this.state.basket
    const index = basket.findIndex( icon => this.isIconInBasket(icon.id, icon.image, icon.price) )  
    const updatedCart = [...basket.slice(0, index), ...basket.slice(index +1)]
            axios.post('/api/cart', updatedCart).then(res => 
            this.setState({basket: res.data}))
            .catch(error => this.setState({serverError: true})) 
}

isIconInBasket = (id, image, price) => {
   const item = this.state.basket.find( icon => 
       (icon.id === id) && (icon.image === image) && (icon.price === price)
   )
   if(item) {
      return true
   } else {
    return false
    }
 }

render() {
    
        return (
        <div className='app'>
            <Switch>
                 <Route exact path = '/' component={Homepage}/>   
                 <Route exact path = '/catalogue' component={Cataloguepage}/>
                 <Route exact path = '/catalogue/:category' component={Categoriespage}/>
                 <Route   path = '/catalogue/:category/:id/' 
                   render={(props) => <Iconpage {...props} 
                   items={this.state.basket}
                   isIconInBasket={this.isIconInBasket}
                   addToBasket={this.addToBasket}
                   loading={this.state.loading}
                   removeItem={this.removeItem}/>}/>
                 <Route exact path = '/basket' 
                  render={(props) => <Basketpage {...props} 
                  items={this.state.basket}
                  removeItem={this.removeItem}
                  plusBasketItem={this.plusBasketItem}
                  setBoard={this.setBoard}
                  loading={this.state.loading}
                  minusBasketItem={this.minusBasketItem}
                  getTotalPrice={this.getTotalPrice}
                  clearBasket={this.clearBasket}
                  error={this.state.serverError}
                  />}/>
                 <Route exact path = '/sentorder' 
                 render={(props) => <Sentorderpage {...props}/>}/>
                 <Route path='/search' component={Search}/>
                 <Route path = '/conditions' component={ConditionsPage} />
                 <Route path = '/sentmail' component={SentMailPage}/>
                 <Route path= '/contacts' component={Contactspage} />
                 <Route component={notfound} />
            </Switch>   
        </div>
        )
}
    
}; export default withRouter(App)
