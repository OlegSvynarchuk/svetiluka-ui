import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../header/index.jsx'
import Categories from '../categories/index.jsx'
import Slider from './carousel.jsx'
import Footer from '../footer/index.jsx'
import './homepage.css'



export default class Home extends Component {


    render() {
        
        return (
            <div className='homepage'>
               <Header></Header>
                    <section className='ikonostas'>
                      <img src='/ikonostas/ikonostas.jpg'></img>
                   </section>
                <main className='container'>   
                   <section className='welcome flex'>
                        <div className='welcome-image-wrapper'> 
                            <img src='/images/luka.jpg'></img>          
                        </div>
                        <div className='welcome-text'>
                            <h2 className='welcome-title'>
                                Добродошли
                            </h2>
                            <p>
                            Добродошли у свет православне иконе. Икона jе увек била извор вере и духовности
                            коjи спаjа земно и божиjе царство. Ми стварамо наше иконе у складу са древним
                            иконописачким техникама и користимо материjале високог квалитета. 
                

                            
                            </p>
                        </div>
                   </section>
                    <Categories />
                   <section className='slider'>
                   <h1 className='section-title'>Како се ствара икона</h1>
                      <Slider />
                   </section>
                   </main>
               <Footer></Footer>
            </div>
        )
    }
    
}
