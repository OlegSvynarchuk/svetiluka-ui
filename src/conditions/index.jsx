import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'

import Error from '../error.jsx'
import './conditions.css'

export default class Conditions extends Component {
    
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }
    state = {
        fileName: '',
        fileSize: 0,
        base64: '',
        iconName: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        message: '',
        sent: false,
        errors: null,
        serverError: false
    }
    fileSelectedHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
        this.setState({base64: e.target.result, fileName: file.name,
        fileSize: file.size})  
    }
        reader.readAsDataURL(file);
 }

 clearData = () => {
    this.setState({
        selectedFile: {},
        base64: '',
        iconName: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        message: '',
    })
}

   clearfile = () => {
    this.fileInput.current.value = ''
    this.setState({
        fileName: '',
        fileSize: 0,
        base64: ''
    })
   }
     
    onHandleSubmit = (e) => {
        e.preventDefault()
        const {name, iconName, email, 
               address, phone, message, 
               base64} = this.state
       
        const requestOptions = {
                name: name,
                email: email,
                address: address,
                iconName: iconName,
                phone: phone,
                message: message,
                base64: base64,
                fileName: this.state.fileName,
                fileSize: this.state.fileSize
            }

            
        
            axios.post('/api/send', requestOptions)
            .then(res => {
                if(res.status === 200) {
                    console.log('sent')
                    this.clearData()
                    this.setState({sent: true})
                }
            })
            .catch(error => {
                if(error.response.status === 400) {
                    const errors = this.convertArrayToObject(error.response.data.errors, 'param')
                this.setState({errors})
                } else {
                    this.setState({serverError: true})
                }
            })
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

        onHandleChange = (e) => {
            const name = e.target.name
            this.setState({
                [name]: e.target.value
            })
        }

    render() {
        if(this.state.sent === true) {
           return <Redirect to={{
               pathname:'/sentmail',
               state: {
                   sent: true
               }
            }}/>
        }
        return (
            <div>
            {this.state.serverError && <Error />}
                <section className='conditions-section-page flex'>
                <div className='order-icon-section'>
                    <h3>Како наручити</h3>
                    <p>
                    Изаберите икону из <Link to='/catalogue'>каталога</Link>,
                    додаjте у корпу и пошалите захтев нама. У поруци можете навести 
                    детаље коjе желите да буду промењени на икони. Иако имајте у виду
                    да канон не сме  бити мењан. Ако нисте пронашли одговараjучу икону
                     у каталогу напишите нама на мејл <span>svetiluka@info.com </span> 
                    коjу икону желите да наручите или попуните формулар испод. Ако имате
                    фотографију можете прикачити и послати заjедно са формуларом. 
                    </p>
                    <div className='order-form-section'>
                    <h2 id='orderIconForm' className='send-form-title'>
                        Наручити икону
                    </h2> 
                    <form 
                    className='basketForm' 
                    onSubmit={this.onHandleSubmit}
                    >
                    <div className='form-field'>
                    <label htmlFor='icon'>Назив иконе *</label>
                            <input id='icon' 
                            placeholder='Назив иконе'
                            name='iconName' 
                            type='text'
                            onChange={this.onHandleChange}
                            value={this.state.iconName}
                            />
                    {this.state.errors && this.state.errors.iconName && <div className='basketform-error'>{this.state.errors.iconName.msg}</div>}        
                    </div>
                    <div className='form-field'>
                    <label htmlFor='name'>Ваше Име *</label>
                        <input id='name' 
                        placeholder='Име'
                        name='name' 
                        type='text'
                        onChange={this.onHandleChange}
                        value={this.state.name}
                        />
                    {this.state.errors && this.state.errors.name && <div className='basketform-error'>{this.state.errors.name.msg}</div>}    
                    </div> 
                    <div className='form-field'>
                    <label htmlFor='email'>Електронска пошта</label>
                        <input id='email' 
                        placeholder='Меjл'
                        name='email' 
                        type='text'
                        onChange={this.onHandleChange}
                        value={this.state.email}
                        />
                    {this.state.errors && this.state.errors.email && <div className='basketform-error'>{this.state.errors.email.msg}</div>}     
                    </div>   
                    <div className='form-field'>
                    <label htmlFor='phone'>Телефон *</label>
                        <input id='phone' 
                        placeholder='Телефон'
                        name='phone' 
                        type='text'
                        onChange={this.onHandleChange}
                        value={this.state.phone}
                        />
                    {this.state.errors && this.state.errors.phone && <div className='basketform-error'>{this.state.errors.phone.msg}</div>}    
                    </div>
                    <div className='form-field'>
                    <label htmlFor='address'>Адреса</label>
                        <input id='address' 
                        placeholder='Адреса'
                        name='address' 
                        type='text'
                        onChange={this.onHandleChange}
                        value={this.state.address}
                        />
                    </div>
                    <div className='file form-field'>
                    <label htmlFor='file'>Пошаљите фотографиjу иконе</label>
                        <input id='file'
                        accept="image/png, image/jpeg"
                        onChange={this.fileSelectedHandler}
                        name='file' 
                        ref={this.fileInput}
                        type='file'
                        /> 
                            {this.state.fileName && <button
                            className='delete-image'
                            type='button'
                            onClick={this.clearfile}>x</button>}
                    {this.state.errors && this.state.errors.fileSize && 
                    <div className='basketform-error'>{this.state.errors.fileSize.msg}</div>}               
                </div>  
                <div className='form-field'>
                <label htmlFor='message'>Порука</label>
                        <textarea id='message' name='message' 
                        placeholder='Напишите поруку'
                        rows='5' 
                        value={this.state.message}
                        onChange={this.onHandleChange}
                        />
                </div>  
                    {this.state.errors && <div className='basketform-error'>унесите исправне податке</div>}    
                        <button 
                        type='submit'
                        className='back-btn' 
                        >Пошаљи
                        </button>
                    </form>
                    </div>
                    </div>
                    <div className='payment-conditions-section'>
                        <h3>Израда</h3>
                    <p>
                    Израда иконе може траjати од 15 до 30 дана
                    у зависности од димензиjе и компликованости 
                        композициjе.
                    </p>
                        <h3>Плаћање</h3>
                    <p>
                    Све иконе плаћају се поузечем након испоруке
                    код купца. Део новца депозит се плаћа по поруџбини 
                    на наш банкарски рачун. На овај начин се ми осигу-
                    равамо ако одустанете од иконе. Можете нас накнадно 
                    контактирати путем меjла. 
                    </p>
                        <h3>Достава</h3>
                    <p>
                    Све иконе испоручују се путем доставе курирском службом. 
                    Пре испоруке свака икона пакуjе се у одговараjуче заштитно
                    паковање како би се избегла оштећења. Трошкове доставе 
                    преузима поручилац.
                    </p>
            </div>
        </section>
    </div>
        )
    }
}
