import React from 'react'
import Ikona from '../ikona/index.jsx'
import Header from '../header/index.jsx'
import Footer from '../footer/index.jsx'

export default function Iconpage({addToBasket, isIconInBasket,
                                removeItem, items, loading
                                }) {
    return (
        <div>
            <Header items={items}></Header>
            <Ikona addToBasket={addToBasket}
                  isIconInBasket={isIconInBasket}
                  removeItem={removeItem}
                  loading={loading}
            />
            <Footer></Footer>
        </div>
    )
}
