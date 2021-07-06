import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import axios from 'axios'



import IconImage from './iconimage.jsx'
import PageNavigation from '../pagenavigation/index.jsx'
import Error from '../error.jsx'
import './ikona.css'


class Ikona extends Component  {
   
    boardRef = React.createRef();
    sizeRef = React.createRef();
        state = {
            icon: null,
            shapes: [],
            sizeshapes: null,
            serverError: false,
            
        }
    

    

    componentDidMount() {
        
       fetch(`/api/catalogue/${this.props.match.params.category}/${this.props.match.params.id}`)
       .then(res => res.json())
       .then(icon => { 
            const shapes = icon.sizeshapes.map(item => Object.keys(item)[0]) 
                if(this.props.location.state) {
                    const {board, price, image, size} =  this.props.location.state
                    const tempIcon = {...icon, 
                            price: price, 
                            size: size, 
                            board: board, 
                            image: image,
                            } 
           this.setState({icon: tempIcon, 
                 baseImage: icon.image,
                 sizeshapes: icon.sizeshapes,
                 shapes: shapes
                })
                } else {    
                    const slava = icon.slava ? icon.slava : '' 
                    const board = shapes[0]
                    const size = icon.sizeshapes[0][board][0]
                    let sizestring = size.split(' x ').join('')
                    const imageUrl = `${icon.image}/${board}${sizestring}.jpg`
                    const initialPrice = this.calculatePrice(size)
        
                    const tempIcon = {...icon, price: initialPrice,
                        size: size, board: board, image: imageUrl, slava: slava}
                    this.setState({icon: tempIcon, 
                        baseImage: icon.image,
                        sizeshapes: icon.sizeshapes,
                        shapes: shapes
        })}
    }
).catch(error => this.setState({serverError: true}))  
        
}
updateDimension = (board, currentSize, variants) => {
    const sizes = variants.find(item => board in item)[board]
    const updatedSize = sizes.includes(currentSize) ? currentSize : sizes[0]
        return updatedSize
}

updateImage = (size, board, imageUrl) => {
    const sizestring = size.split(' x ').join('')
    const updatedImage = `${imageUrl}/${board}${sizestring}.jpg`
        return updatedImage
}

calculatePrice = (size, rate = 0.255 ) => {
    const [height, width] = size.split(' x ')
    const basePrice = (+height * +width) * rate
    const price = (basePrice % 10) ? Math.floor(basePrice / 10) * 10 : basePrice
    return price
}

componentDidUpdate(prevProps, prevState) {
    const {board, size} = this.state.icon || {}
   
    //update price
    if ((prevState.icon && this.state.icon) && (this.state.icon.size !== prevState.icon.size) ) {
        const updatedPrice = this.calculatePrice(size)
        const updatedSize =  this.updateDimension(board, size, this.state.sizeshapes)
        const updatedImage = this.updateImage(size, board, this.state.baseImage)
        this.setState({icon: {
            ...this.state.icon, price: updatedPrice, size: updatedSize, image: updatedImage
        }})
        //update history state
        this.props.history.replace({
            pathname: this.props.location.pathname,
            state: {
                board: board,
                image: updatedImage,
                price: updatedPrice,
                size: size
            }
        })
    } 
    //update size and image 
   if((prevState.icon && this.state.icon) && (this.state.icon.board !== prevState.icon.board)) {
     const updatedSize =  this.updateDimension(board, size, this.state.sizeshapes)
     const updatedImage = this.updateImage(size, board, this.state.baseImage)
     const updatedPrice = this.calculatePrice(size)
        this.setState({icon: {
            ...this.state.icon, size: updatedSize, image: updatedImage,
            price: updatedPrice
        }})
        //update history state
        this.props.history.replace({
            pathname: this.props.location.pathname,
            state: {
                board : board,
                image: updatedImage,
                price: updatedPrice,
                size: updatedSize
            }
        })
   }
}

    setBoard = (e) => {
        const board = e.target.value
        this.setState({icon: {...this.state.icon,  
                    board : board
                    }
                }, () => {this.boardRef.current.blur()})
    }

    setSize = (e) => {
        const size = e.target.value
        this.setState({
            icon: {
                ...this.state.icon, size: size,
            }
        }, () => {this.sizeRef.current.blur()})
}
    

    render() {
         const {id, image, price, board} = this.state.icon || {}
         const sizes = this.state.icon && this.state.sizeshapes.find(item => board in item)[board]
         const addTobasketButtonClasses = classNames({
        'addtocart-button': true,
        'added': this.props.isIconInBasket(id, image, price)
    })
       
   return (
         <div className='icon-page'>
         {this.state.serverError && <Error />}
           {this.state.icon  &&  <>
                <div className='icon-page-header flex'>
                  <h2 className='icon-title'>{this.state.icon.name}</h2>
                    { this.state.icon.slava && <p><span><img src='/images/ssss.jpg'
                                  width='20px'/>
                        </span>
                        крсна слава: {this.state.icon.slava}
                    </p> 
                    }       
                </div>
                <PageNavigation>
                <Link to={`/`}><i className="fas fa-home"></i> </Link>
                <span>{'>'}</span>
                <Link to={`/catalogue`}>иконе </Link>
                <span>{'>'}</span>
                <Link to={`/catalogue/${this.props.match.params.category}`}>
                     {this.props.match.params.category}
                </Link>
                </PageNavigation>
                <div className='icon-page-content'>
                <IconImage src={this.state.icon.image}
                alt={this.state.icon.name}
                />             
                    <div className='icon-info'>
                      <p className='icon-price'>Цена €{this.state.icon.price}</p>
                      <div className='icon-options'>
                        <div className='icon-options-item flex'>
                        <label htmlFor="size">Димензиja</label>
                            <select name="size" id="size"
                            value={this.state.icon.size}
                            onChange={this.setSize}
                            ref={this.sizeRef}
                            >
                            {sizes.map((size) => {
                                return(
                                    <option key={size}
                                     value={size}
                                    >
                                      {size}
                                    </option>
                                )
                            })}
                            </select>
                        </div>
                        <div className='icon-options-item flex'>
                        <label htmlFor="board">Даска</label>
                            <select name="board" id="board"
                            value={this.state.icon.board}
                            onChange={this.setBoard}
                            ref={this.boardRef}
                            >
                            {this.state.shapes.map(item => {
                               
                               return(<option 
                               key={item}
                               value={item}>
                                    {item === 'square' ?
                                    'Четвртаста' : 'Полукружна'}
                                </option>) 
                            })}    
                        </select>
                        </div>
                        <div>
                              {
                                  this.props.isIconInBasket(id, image, price) && <button 
                                  className='remove-icon-button'
                                  onClick={() => this.props.removeItem(id, image, price)}>
                                    <span><i className="fa fa-times-circle-o" aria-hidden="true"></i></span>    
                                    ИЗБРИШИ
                                </button>
                              }  
                            </div>
                          
                    </div>
                    <div className='addtocart-button-wrapper flex'>
                    <button className={addTobasketButtonClasses}
                       onClick={() => this.props.addToBasket(this.state.icon)}
                       disabled={this.props.isIconInBasket(id, image, price)}
                       >
                       {this.props.isIconInBasket(id, image, price) ? 'У корпи' : 'Додаj у корпу'}    
                       {this.props.loading && <span>...</span>}
                    </button>
                    <Link to ={{
                        pathname: '/basket',
                    }} 
                        className='addtocart-button brown'>Моjа корпа</Link>
                    </div>
                    <Link to ='/catalogue' className='back-btn'>Вратисе у каталог</Link>
                </div>  
            </div>
        </>  }
    </div>
    ) 
}
    
}; export default withRouter(Ikona)
