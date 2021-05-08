import React, {Component} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

export default class Slider extends Component {
       
    render() {
        
        return (
            <>
            
            <Carousel
            autoPlay={false}
            showThumbs={false}
            infiniteLoop={true}
            interval={3000}
            showIndicators={false}
            showStatus={false}
            
            
            
            
        >
             <div className='slide-container'>
                 <div className ='slideimagecontainer'>
                    <img src='/creation/icon1.jpg'>
                     </img>
                 </div>
                 
                 <div className='caption'>
                 <h4>Припрема даске</h4>    
                 <p>Не следует, однако забывать, 
                 что дальнейшее развитие различных форм деятельности 
                обеспечивает широкому кругу (специалистов) участие</p>
                 </div>
            </div>   
            <div className='slide-container'>
                 <div className ='slideimagecontainer'>
                    <img src='/creation/icon2.jpg'>
                     </img>
                 </div>
                 
                 <div className='caption'>
                 <h4>Сликанье</h4> 
                <p> Не следует, однако забывать, 
                 что дальнейшее развитие различных форм деятельности 
                обеспечивает широкому кругу (специалистов) участие</p>
                 </div>
            </div>
            <div className='slide-container'>
                 <div className ='slideimagecontainer'>
                    <img src='/creation/icon3.jpg'>
                     </img>
                 </div>
                 
                 <div className='caption'>
                 <h4>Позлачиванье</h4> 
                 <p>Не следует, однако забывать, 
                 что дальнейшее развитие различных форм деятельности 
                обеспечивает широкому кругу (специалистов) участие</p>
                 </div>
            </div>
            <div className='slide-container'>
                 <div className ='slideimagecontainer'>
                    <img src='/creation/icon4.jpg'>
                     </img>
                 </div>
                 
                 <div className='caption'> 
                 <h4>Готова икона</h4> 
                 <p>Не следует, однако забывать, 
                 что дальнейшее развитие различных форм деятельности 
                обеспечивает широкому кругу (специалистов) участие</p>
                </div>
            </div>
              
        </Carousel>
            </>
        )
    }
   
}

