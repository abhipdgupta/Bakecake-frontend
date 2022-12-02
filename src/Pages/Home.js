import React from 'react'
import { Banner } from '../Components/Banner'
import {AvailableFlavour} from '../Components/Category'
import {Products} from '../Components/Products'

export const Home = ({banner , category,product,onAddToCart}) => {
  
  
  return (
    <>

    <Banner banner={banner}/>
   

    <AvailableFlavour category={category}/>
   

    <Products product={product} onAddToCart={onAddToCart} />

    
    
    </>
  )
}
