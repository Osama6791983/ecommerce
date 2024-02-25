import React, { useEffect, useState } from "react";
import "./Products.css"
import { Fragment } from "react";
import Loader from "../layout/Loader/Loader";
import {clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import MetaData from './../layout/MetaData';
import ProductCard from "../Home/ProductCard.js"
import Pagination from "react-js-pagination"
import Typography from "@material-ui/core/Typography"
import Slider from "@material-ui/core/Slider"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
  "Fragrance"
];
const Product = ({match}) => {
  
  const [price, setprice] = useState([0,2000])
  const [category, setCategory] = useState("")
  const [ratings, setRatings] = useState(0)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPageNo] = useState(1)
  const {products,loading,error,productsCount,resultPerpage} = useSelector((state)=>{return (
    state.products
  )})
  
  
  const changeCurrentPage = (e)=>{
    setCurrentPageNo(e)
    
  }
  const priceHandler = (event,newPrice)=>{
    setprice(newPrice)
    
  }

  const keyword = match.params.keyword
  
  useEffect(() => {
  
  if (error) {
    toast.error(error)
    
    dispatch(clearErrors())
  }
   dispatch(getProduct(keyword,currentPage,category,ratings))
  }, [dispatch,keyword,currentPage ,category,ratings,error])
  


  return <Fragment>{loading ? <Loader /> : <Fragment>
     <MetaData title="PRODUCTS -- ECOMMERCE" />
     
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products?.map((product)=>{
                return (
                  <ProductCard product={{product}}/>
                )
              })}
          </div>
          <div className="filterBox">
              <Typography>
                Price
                <Slider value={price} valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={2000}
                onChange={priceHandler}
                />
                
              </Typography>
              <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                  console.log(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
         
          {
            resultPerpage < productsCount && <div className="paginationBox">
            <Pagination  activePage={currentPage}
              itemsCountPerPage={resultPerpage}
              totalItemsCount={productsCount}
              onChange={changeCurrentPage}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"/>
        </div>
          }
    </Fragment>}</Fragment>;
};

export default Product;
