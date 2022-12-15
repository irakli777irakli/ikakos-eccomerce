import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {whichCurrencyIsSelected} from '../features/products/productsSlice'

export default function Exchange() {

    const dispatch = useDispatch();
    const {amount, categoryNames,isCartOpen,cartItems,currencyNames,currencyIndex,isExchangeOpen} = useSelector((store) => store.products);


  return (
    <div className='exchange'>
        {currencyNames.map((curr,i)=>{
            return (
                <div key={i} className='single-currency-wrapper' onClick={()=> dispatch(whichCurrencyIsSelected({i}))}>
                    <h4>{curr.symbol}</h4>
                    <h4>{curr.label}</h4>
                </div>
            )
        })}
    </div>
  )
}
