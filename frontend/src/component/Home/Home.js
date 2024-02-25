import React, { Fragment, useEffect } from 'react'
import "../Home/Home.css"
import Product from './ProductCard'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from "react-redux"
import { getProduct } from './../../actions/productAction';
import Loader from '../layout/Loader/Loader'

const Home = () => {
    const {loading,error,products,productsCount} = useSelector((state)=>{return state.products})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    return (

      <Fragment>
        {loading ?<Loader/>:(
              <Fragment>
              <MetaData title={"Ecommerce"} />
              <div className="banner">
                  <p>Welcome to Ecommerce</p>
                  <h1>FIND AMAZING PRODUCTS BELOW</h1>
  
                  <a href="#container">
                      <button>
                          Scroll
                      </button>
                  </a>
              </div>
  
              <h2 className="homeHeading">Featured Products</h2>
              <div className="container" id="container">
                  
                 {
                 
                  products && products?.map((product)=>{
                      return( <Product product={{product}}/>)
                  })
                 }
   
              </div>
  
  
          </Fragment>
        )}
      </Fragment>
    )
}

export default Home
