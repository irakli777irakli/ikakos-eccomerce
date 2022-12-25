import React, { useEffect, useState } from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {AiOutlineDollar,AiOutlineDown,AiOutlineShoppingCart} from 'react-icons/ai'
import {GiBowlSpiral} from 'react-icons/gi'
// redux stuff
import { useSelector, useDispatch } from 'react-redux'
import {whichCategoryIsSelected,setCartOpen, calculateTotal,setExchangeOpen,handleNavbarChange} from '../features/products/productsSlice'

import Cart from './Cart'
import Exchange from './Exchange'

export default function Navbar() {
    
    const {amount, categoryNames,isCartOpen,cartItems,currencyNames,
        currencyIndex,isExchangeOpen,navbarIndex} = useSelector((store) => store.products);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    useEffect(()=>{
        dispatch(calculateTotal());

    },[cartItems,currencyIndex])

  return (
    <nav className='nav'>
        <div className="nav-center">
            <div className='category_area'>
                <ul>
                    {categoryNames.map((category,i)=>{
                        return (
                        <li key={i} className={navbarIndex === i ? "active_category" : ""} onClick={()=> {dispatch(handleNavbarChange({i})); dispatch(whichCategoryIsSelected(category)); navigate("/")}}>
                            {category.toUpperCase()}      
                        </li>
                        )
                    })}
                </ul>
            </div>
            <div className='logo_area'>
                <Link to='/'>
                    <GiBowlSpiral className='logo'/>
                </Link>
            </div>
            <div className='cart_area'>
                <div className='currency-exchange' onClick={()=> dispatch(setExchangeOpen())}>
                    <h4 className='dollar'>{currencyNames[currencyIndex].symbol}</h4>                    
                    <AiOutlineDown className='up-btn'/>
                </div>
                <div className='cart-and-amount' onClick={()=> dispatch(setCartOpen())}>
                    <AiOutlineShoppingCart className='cart'/>
                    {amount >= 1 && <p>{amount}</p>}
                </div>
            </div>
        </div>
        {isCartOpen && <Cart />}
        {isExchangeOpen && <Exchange />}
    </nav>
  )
}



