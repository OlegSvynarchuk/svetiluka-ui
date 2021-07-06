import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router'
import {Link} from 'react-router-dom'
import './sentmail.css'

class SentMail extends Component{
    state  = {
        sent: false
    }
    componentDidMount() {
        if(this.props.location.state) {
           this.setState({sent: true})
            this.props.history.replace({
                pathname:"/sentmail",
                state: null}) 
            }
        }
       
    render() {
      if(!this.state.sent) {
            return <Redirect to = '/'></Redirect>
        } else {
            return (
                <div className='sentmail'>
                    <h4>Ваш меjл jе успешно послат. 
                        Ускоро чемо контактирати вас
                        у вези иконе коjу сте наручили
                    </h4>
                    <Link to ='/catalogue' className='back-btn'
                        style={{width: '250px'}}
                        >Вратисе у каталог</Link>
                </div>
            )
        }
    }
    
}; export default withRouter(SentMail)
