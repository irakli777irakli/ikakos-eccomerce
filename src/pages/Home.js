import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingleProduct from '../components/SingleProduct';
import {whichCategoryIsSelected} from '../features/products/productsSlice'


export default function Home() {

  const {itemsBasedOnCategory,isCartOpen,isExchangeOpen} = useSelector((store)=> store.products);

  const dispatch = useDispatch()

  useEffect(()=>{
    if(!localStorage.getItem("category")){
      dispatch(whichCategoryIsSelected("all"))
    }
   
  },[])
  
  if(itemsBasedOnCategory?.length === 0){
    return <h1>Loading ...</h1>
  }
 
  // section-secter-blur
  

  return (
    <section className={isCartOpen ||isExchangeOpen ? 'section-center section-secter-blur' : 'section-center'} >
       {itemsBasedOnCategory[0]?.map((item)=>{
        const {name,id,inStock,gallery,description,prices,brand} = item;
        return <SingleProduct key={id} name={name} inStock={inStock} picture={gallery[0]} gallery={gallery} prices={prices} desc={description} brand={brand} id={id}/>
      })}
    </section>
  )
}


 /// start here. make currency exchange works in every scenario
 // responsivity and finish
 