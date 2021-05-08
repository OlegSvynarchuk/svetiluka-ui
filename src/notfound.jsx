import React from 'react'
import {Link} from 'react-router-dom'

export default function notfound() {
    return (
        <div>
            <h1>404, THE PAGE WASNT FOUND</h1>
            <Link to='/catalogue'>GO TO ICONS CATALOGUE</Link>
        </div>
    )
}
