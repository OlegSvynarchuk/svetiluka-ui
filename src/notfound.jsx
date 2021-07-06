import React from 'react'
import {Link} from 'react-router-dom'

export default function notfound() {
    return (
        <div>
            <h1>404, Страница ниjе нађена</h1>
            <Link to='/catalogue'>Каталог Икона</Link>
        </div>
    )
}
