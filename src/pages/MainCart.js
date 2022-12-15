import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartLogic from '../components/CartLogic';

export default function MainCart() {

  const {cartItems,amount,total,cartItemSelectedOptions,currencyNames,currencyIndex} = useSelector((store) => store.products);

  useEffect(()=> {},[currencyIndex])
  


  return (
    <section className='main-cart-init'>
      <h1>CART</h1>
      <div className='mainCart-wrapper'></div>
      <CartLogic mainCart={true}/>
     
      <div className='mainCart-money-wrapper'>
        <p >Quantity: <span>{amount}</span></p>
        <p>Total: <span>{currencyNames[currencyIndex].symbol}{total.toFixed(2)}</span></p>
        <button className='checkout'>ORDER</button>
      </div>

    </section>
  )
}
