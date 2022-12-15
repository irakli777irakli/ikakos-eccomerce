import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {inCart,selectCartOptions,whichCategoryIsSelected} from '../features/products/productsSlice'
import SingleProductUi from '../components/SingleProductUi'



export default function SingleProduct() {

  const {id} = useParams();
  const dispatch = useDispatch()

  const {products,itemsBasedOnCategory,cartItems,singleProductNotInCart,singleProductInCart,cartItemSelectedOptions,beforeCartSelectedOptions} = useSelector((store) => store.products);

 
  

  useEffect(()=> {
    // console.log("this")
    dispatch(whichCategoryIsSelected("all"))
    dispatch(inCart({id}))

  },[cartItems])

 
  useEffect(()=>{
    
    
  },[])
  return (

    <section className='single-product-init'>
      {
       singleProductInCart && singleProductInCart?.length === 0 ? <SingleProductUi /> : <SingleProductUi singleItemInCart={true}/>
      }
    </section>
  )
}

// tackle cartLogic.




