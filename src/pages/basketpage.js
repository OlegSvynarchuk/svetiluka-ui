import React from 'react'
import Footer from '../footer/index.jsx'
import Basket from '../basket/index.jsx'
import Header from '../header/index.jsx'

export default function Basketpage({items, 
    plusBasketItem, minusBasketItem,
    getTotalPrice, clearBasket, removeItem, setBoard, loading,
    error
    }) {
    return (
        
        <div>
        <Header items={items}></Header>    
            <div>
            <Basket items={items} 
            setBoard={setBoard}
            loading={loading}
            plusBasketItem={plusBasketItem} 
            minusBasketItem={minusBasketItem} 
            getTotalPrice={getTotalPrice}
            clearBasket={clearBasket}
            removeItem={removeItem}
            error={error}
            />
            </div>
            
        <Footer></Footer>    
        </div>
    )
}
