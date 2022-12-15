import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {selectCartOptions,changeSinglePageImg, addToCart,setCartImage} from '../features/products/productsSlice'

export default function SingleProductUi({singleItemInCart}) {




    const dispatch = useDispatch()
    const {itemsBasedOnCategory,cartItems,singleProductNotInCart,singleProductInCart,cartItemSelectedOptions,beforeCartSelectedOptions,imgIndex,currencyNames,currencyIndex} = useSelector((store) => store.products);
  
  
    useEffect(()=>{

    },[imgIndex,currencyIndex])



    const determindeClassName = (id,name,productName) => {

  
    
        const response = cartItemSelectedOptions.find((item)=> (item.id === id) && (item.name === name) && (item.productName === productName));
        const NotInCartOne = beforeCartSelectedOptions.find((item)=> (item.id === id) && (item.name === name) && (item.productName === productName))
        
        
        
        
        
        // if item is selected apply styles
        if(response){
            if(response.name === "Color"){
                return "single-attribute selected-button Color-category"
            }else{
                return "single-attribute selected-button"
            }
            
            
        }else if(NotInCartOne){
          if(NotInCartOne?.name === "Color"){
            return "single-attribute selected-button Color-category"
        }else{
            return "single-attribute selected-button"
        }
        }
        else{
            return "single-attribute"
        }
    
    }
     
    const properSlice = (desc) => {
      let properText = desc.replace("</p>","");
      properText = properText.replace("<p>", "");
      properText = properText.replace("</h1>");
      properText = properText.replace("<h1>");
      return properText

    }

    const render = (singleProductInCartOrNot,itemInCart) => {
        return (
            singleProductInCartOrNot?.map((el)=>{
        
                const {name,brand,gallery,prices,attributes,id,amount,description} = el;
        
                return (
                  <div key={id} className='single-product-wrapper'>
                    <div className='single-product-img-wrapper'>
                      {/* image div */}
                      <div className='single-product-img-collection-wrapper'>
                        {gallery.map((image,i)=> {
                          return (<img key={i} src={image} alt="image" className='one-of-the-img-from-collections' onClick={()=> dispatch(changeSinglePageImg({i}))}/>)
                        })}
                      </div>
                      <div className='selected-img-wrapper'>
                        <img src={gallery[imgIndex]} alt="main-img" className='single-product-selected-img'/>
                      </div>
        
                    </div>
                        {/* stats div */}
                    
                        <div className='mainCart-r'>
                                 <h4>{brand}</h4>
                                 <h4>{name}</h4>
                                
                                 <div className='cart-r-attributes-wrapper'>
                                     {attributes.map((attribute,i)=>{
                                         const {name,id,items} = attribute;
                                         return (
                                             <>
                                             <h4 key={id}>{name}</h4>
                                             <div key={i} className='cart-r-attributes-btn-wrapper'>
                                             {items.map((item,i)=>{
                                                 const {value,id} = item;
                                                 return (
                                                     <button key={i} style={name === "Color" ? {backgroundColor:`${value}`,color:"#8B7E74",fontWeight:"600"} : {}}
                                                     
                                                     onClick={() => dispatch(selectCartOptions({id,name,productName:el.id})) }
                                                     className={determindeClassName(id,name,el.id)}
                                                     >  
                                                     {name === "Color" ? "": value}
                                                     </button>
                                                 )
                                             })}
                                             </div>
                                             </>
                                         )
                                     })}
                                 </div>
                                 
                                 <h4 style={{fontWeight:"300",fontFamily:"Ubuntu",fontSize:"1.2rem"}}>Price</h4>
                                 <p style={{fontWeight:"600",fontSize:"1.2rem",fontFamily:"Ubuntu"}}>{prices[currencyIndex].currency.symbol} {prices[currencyIndex].amount}</p>
                                 {itemInCart ? null: <button className='checkout' onClick={() => {dispatch(addToCart({id})); dispatch(setCartImage({gallery,move:"initial",id}))  }}>ADD TO CART</button>}
                                 {/* properly format text (</p>) */}
                                 {properSlice(description)}
                             </div>
        
        
        
        
                  </div>
                )
              })
        )
    }


  return (
    <>
    {singleProductInCart?.length === 0 ? render(singleProductNotInCart,singleItemInCart) :  render(singleProductInCart,singleItemInCart)}
    
    </>
  )
}


// replace and add to cart cogic