import React, { useEffect } from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart, setCartImage } from '../features/products/productsSlice'


export default function SingleProduct({name,inStock,picture,gallery,prices,desc,brand,id}) {

  const {currencyIndex} = useSelector((store) => store.products)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=> {},[currencyIndex])
  return (
    <div className='single-product'>
        <div className='single-product-img-container'>
           
              <img src={picture} alt={name} onClick={()=> inStock ? navigate(`/singleProduct/${id}`) : navigate(`/`)}  />
              
            {inStock === false && <div className='out-of-stock-wrapper'><span>Out of Stock</span></div>}
            {inStock && <div className='in-stock-wrapper' onClick={()=> {dispatch(addToCart({id})); dispatch(setCartImage({gallery,move:"initial",id}))}}><AiOutlineShoppingCart/></div>}
        </div>
        <div className='single-product-name-container'>
            <p className={inStock === false ? "notInStock-p" : "inStock-p"}>{brand} {name}</p>
            <p className={inStock === false ? "notInStock-p" : "inStock-p"}>{prices[currencyIndex].currency.symbol} {prices[currencyIndex].amount}</p>
        </div>
    </div>
  )
}
