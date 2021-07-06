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
                    <img src='/creation/scratch.jpg'>
                     </img>
                 </div>
                 
                 <div className='caption'>
                 <h4>Припрема даске</h4>    
                 <p>Пре сликања на липову даску се наноси око 12 слојева
                     туткално кредне препаратуре. Затим се она суши па 
                     шмиргла најфиником воденом шмирглом. 
                 </p>
                 </div>
            </div>   
            <div className='slide-container'>
                 <div className ='slideimagecontainer'>
                    <img src='/creation/painting.jpg'>
                     </img>
                 </div>
                 
                 <div className='caption'>
                 <h4>Сликање</h4> 
                <p>Икона се слика јајчаном темпером коју ручно правимо
                    од квалитетних пигмената, жуманцета и сирћета.
                    У нашој радионици се иконопише у византијској 
                    техници сликања.
                    </p>
                 </div>
            </div>
            <div className='slide-container'>
                 <div className ='slideimagecontainer'>
                    <img src='/creation/glue.jpg'>
                     </img>
                 </div>
                 
                 <div className='caption'>
                 <h4>Припрема за позлату</h4>    
                 <p>После сликања се приступа наношењу посебног лака
                     шелака који се шмиргла да буде потпуно гладак а
                     потом се површина на коју иде злато премазује 
                     микстион лепком.
                 </p>
                 </div>
            </div>
            <div className='slide-container'>
                 <div className ='slideimagecontainer'>
                    <img src='/creation/gold.jpg'>
                     </img>
                 </div>
                 
                 <div className='caption'>
                 <h4>Позлаћивање</h4> 
                 <p>За наше иконе користимо Розенобл 24 каратно
                     злато у трансфер стању. Оно се наноси када 
                     микстион почне да лепи. После лепљења се 
                     површина лагано полира памучном ватом.
                 </p>
                 </div>
            </div>
            <div className='slide-container'>
                 <div className ='slideimagecontainer'>
                    <img src='/creation/readyicon.jpg'>
                     </img>
                 </div>
                 
                 <div className='caption'> 
                 <h4>Готова икона</h4> 
                 <p>После завршне обраде ивица и рама бојом икона
                     се лакира сликарским акрилним лаком у спреју. 
                     Позадина је заштићена црвеном бојом и на њој
                     стоји сертификат о самој издради наше радионице.
                 </p>
                </div>
            </div>
              
        </Carousel>
            </>
        )
    }
   
}

