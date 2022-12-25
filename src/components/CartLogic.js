import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import {setCartOpen,toggle,calculateTotal,selectCartOptions, setCartImage} from '../features/products/productsSlice'
import { useNavigate } from 'react-router-dom'
import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io'
import SingleProduct from '../pages/SingleProduct'
export default function CartLogic({mainCart}) {


    const {cartItems,amount,total,cartItemSelectedOptions,tempProd,currencyIndex} = useSelector((store) => store.products);
    const dispatch = useDispatch()
    const navigate = useNavigate()

   

    
   useEffect(()=> {
        dispatch(calculateTotal());
        
   },[cartItems,tempProd,currencyIndex])

 

    const determindeClassName = (id,name,productName) => {
    
        const response = cartItemSelectedOptions.find((item)=> (item.id === id) && (item.name === name) && (item.productName === productName));
        // if item is selected apply styles
        if(response){
            if(response.name === "Color"){
                return "single-attribute selected-button Color-category"
            }else{
                return "single-attribute selected-button"
            }
            
            
        }else{
            return "single-attribute"
        }

   }



   const render = () => {
    if(mainCart){
        return (
            cartItems?.map((el,i)=> {
                const {name,brand,gallery,prices,attributes,id,amount} = el;
                return (
                 <>
                 <hr key={name}/>
                 <div key={i} className='mainCart-item-wrapper'>
                     
                     <div className='mainCart-r'>
                         <h4>{brand}</h4>
                         <h4>{name}</h4>
                         <p>{prices[currencyIndex].currency.symbol} {prices[currencyIndex].amount}</p>
                         <div className='cart-r-attributes-wrapper'>
                             {attributes.map((attribute)=>{
                                 const {name,id,items} = attribute;
                                 return (
                                     <>
                                     <h4>{name}</h4>
                                     <div key={id} className='cart-r-attributes-btn-wrapper'>
                                     {items.map((item)=>{
                                         const {value,id} = item;
                                         return (
                                             <button key={id} style={name === "Color" ? {backgroundColor:`${value}`,color:"#8B7E74",fontWeight:"600"} : {}}
                                             
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
                     </div>
                     
     
                     <div className='mainCart-l'>
                     <div className='increase-decrease'>
                         <button className='single-attribute' onClick={()=> dispatch(toggle({incdec:"inc",productId:id}))}>+</button>
                         <p>{amount}</p>
                         <button className='single-attribute' onClick={()=> dispatch(toggle({incdec:"dec",productId:id}))}>-</button>
                     </div>
                     <div className='mainCart-l-img-wrapper'>
                         
                         {tempProd?.length === 0 ?  <img src={ gallery[0] } alt={name} className='mainCart-l-img'/>:
                             tempProd.map((item,i)=> {if(item.id === id){
                                 return (<img key={i} src={item.gallery[item.initialIndex]} alt="img" className='mainCart-l-img'/>)
                             }})
                         }
                         <div className='img-slider-wrapper'>
                             <button className='pre-img' onClick={() => dispatch(setCartImage({gallery,move:"prev",id}))  }><IoIosArrowBack /></button>
                             <button className='next-img' onClick={() => dispatch(setCartImage({gallery,move:"next",id}))}><IoIosArrowForward /></button>
                         </div>
                     </div>
                     </div>
                     
                 </div>
                 </>
                )
             }) 
            )
    }
    else{
       
       return (
          cartItems?.slice(0,2).map((el,i)=> {
                const {name,brand,gallery,prices,attributes,id,amount} = el;
                return (
                 <div key={i} className='cart-item-wrapper'>
                     <div className='cart-r'>
                     <h4>{brand}</h4>
                     <h4>{name}</h4>
                     <p>{prices[currencyIndex].currency.symbol} {prices[currencyIndex].amount}</p>
                     <div className='cart-r-attributes-wrapper'>
                         {attributes.map((attribute)=>{
                             const {name,id,items} = attribute;
                             return (
                                 <>
                                 <h4>{name}</h4>
                                 <div className='cart-r-attributes-btn-wrapper'>
                                 {items.map((item)=>{
                                     const {value,id} = item;
                                     return (
                                         <button style={name === "Color" ? {backgroundColor:`${value}`,color:"#8B7E74",fontWeight:"600"} : {}}
                                           
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
                     </div>
                     
     
                     <div className='cart-l'>
                     <div className='increase-decrease'>
                         <button className='single-attribute' onClick={()=> dispatch(toggle({incdec:"inc",productId:id}))}>+</button>
                         <p>{amount}</p>
                         <button className='single-attribute' onClick={()=> dispatch(toggle({incdec:"dec",productId:id}))}>-</button>
                     </div>
                     <div className='cart-l-img-wrapper'>
                         <img src={gallery[0]} alt={name} className='cart-l-img'/>
                     </div>
                     </div>
                     
                 </div>
                 
                )
             } 
        ))
   
           
    
    }






   }
   
  return (
    <>
    {render()}
    </>
  )
}



