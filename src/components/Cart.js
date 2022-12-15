import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import {setCartOpen,toggle,calculateTotal,selectCartOptions} from '../features/products/productsSlice'
import { useNavigate } from 'react-router-dom'
import CartLogic from './CartLogic'


export default function Cart() {

    const {cartItems,amount,total,cartItemSelectedOptions,currencyIndex,currencyNames} = useSelector((store) => store.products);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    
   useEffect(()=> {
        dispatch(calculateTotal())
   },[cartItems,currencyIndex])

 

    if(cartItems?.length === 0){
        return (<aside className='empty-cart'>
            <h3>Your Bag is Currently Empty</h3>
            <button onClick={()=> {dispatch(setCartOpen()); navigate('/')}}>Start shoping</button>
        </aside>)
    }

   

  return (
    // maincart conditional rendering
    <aside className='cart-init'>
        <h3><strong>My Bag</strong> {amount} items</h3>
        <CartLogic />
        <div className='total-money'>
        <span>Total</span>
        <span>{currencyNames[currencyIndex].symbol}{total.toFixed(2)}</span>
        </div>
        <div className='view-cart-checkout-wrapper'>
            <button className='view-cart' onClick={() => {navigate("/cart"); dispatch(setCartOpen())}}>View Bag</button>
            <button className='checkout'>CHECK OUT</button>
        </div>
    </aside>
  )
}




// const determindeClassName = (id,name,productName) =>{
    
//     const response = cartItemSelectedOptions.find((item)=> (item.id === id) && (item.name === name) && (item.productName === productName));
//     // if item is selected apply styles
//     if(response){
//         if(response.name === "Color"){
//             return "single-attribute selected-button Color-category"
//         }else{
//             return "single-attribute selected-button"
//         }
        
        
//     }else{
//         return "single-attribute"
//     }

//    }



// { cartItems?.slice(0,2).map((el)=> {
//     const {name,brand,gallery,prices,attributes,id,amount} = el;
//     return (
//      <div className='cart-item-wrapper'>
//          <div className='cart-r'>
//          <h4>{brand}</h4>
//          <h4>{name}</h4>
//          <p>{prices[0].currency.symbol} {prices[0].amount}</p>
//          <div className='cart-r-attributes-wrapper'>
//              {attributes.map((attribute)=>{
//                  const {name,id,items} = attribute;
//                  return (
//                      <>
//                      <h4>{name}</h4>
//                      <div className='cart-r-attributes-btn-wrapper'>
//                      {items.map((item)=>{
//                          const {value,id} = item;
//                          return (
//                              <button style={name === "Color" ? {backgroundColor:`${value}`,color:"#8B7E74",fontWeight:"600"} : {}}
                               
//                               onClick={() => dispatch(selectCartOptions({id,name,productName:el.id})) }
//                               className={determindeClassName(id,name,el.id)}
//                               >  
//                               {name === "Color" ? "": value}
//                               </button>
//                          )
//                      })}
//                      </div>
//                      </>
//                  )
//              })}
//          </div>
//          </div>
         

//          <div className='cart-l'>
//          <div className='increase-decrease'>
//              <button className='single-attribute' onClick={()=> dispatch(toggle({incdec:"inc",productId:id}))}>+</button>
//              <p>{amount}</p>
//              <button className='single-attribute' onClick={()=> dispatch(toggle({incdec:"dec",productId:id}))}>-</button>
//          </div>
//          <div className='cart-l-img-wrapper'>
//              <img src={gallery[0]} alt={name} className='cart-l-img'/>
//          </div>
//          </div>
         
//      </div>
     
//     )
//  })}



