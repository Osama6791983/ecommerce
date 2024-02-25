import React, { useEffect, useState } from "react";
import { useAlert } from 'react-alert'
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import ReviewCard from "./ReviewCard.js";
import Rating from "react-rating-stars-component";
import Loader from "../layout/Loader/Loader";
import { Add_to_cart } from "../../actions/cartAction";


const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const [quantity, setquantity] = useState(1)

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const options = {
    value: product?.ratings,
    precision: 0.5,
    edit:false,
    size:window.innerWidth<600 ? 20 : 25,
    isHalf:true 
  };
  const decreaseQuentity = ()=>{
    if(quantity===1){
      return
    }
    const qty = quantity - 1;
    setquantity(qty)
   
  }

  const increaseQuanity = ()=>{
    
   
    if (quantity===product.stock) {
      return
    }
    const qty = quantity + 1;
    setquantity(qty)
  }

 const additemTocart = ()=>{
  dispatch(Add_to_cart(match.params.id,quantity));
  alert("Item Added To Cart Successfully!")
 }
  useEffect(() => {
   
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id,alert,error]);


  return (
   <Fragment>
    {
        loading ?(<Loader/>):( <Fragment>
            <MetaData title={`${product?.name} -- ECOMMERCE`} />
            <div className="ProductDetails">
              <div>
                <Carousel>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                </Carousel>
                </div>
      
              <div>
                <div className="detailsBlock-1">
                  <h2>{product.name}</h2>
                  <p>Product # {product._id}</p>
                </div>
                <div className="detailsBlock-2">
                  <Rating {...options} />
                  <span className="detailsBlock-2-span">
                    {" "}
                    ({product.numOfReviews} Reviews)
                  </span>
                </div>
                <div className="detailsBlock-3">
                  <h1>{`₹${product.price}`}</h1>
                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuentity}>-</button>
                      {/* <input  type="text"  disabled value={quantity}/> */}
                      <input readOnly type="text" value={quantity} />
                      <button onClick={increaseQuanity}>+</button>
                    </div>
                    <button disabled={product.stock < 1 ? true : false} onClick={additemTocart}>
                      Add to Cart
                    </button>
                  </div>
                </div>
                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
      
                <div className="detailsBlock-4">
                  Description : <p>{product.description}</p>
                </div>
                <button  className="submitReview">
                      Submit Review
                    </button>
              </div>
      
            </div>
            <h3 className="reviewsHeading">REVIEWS</h3>
            {
              product.reviews && product.reviews[0] ?(
                  <div>
                      {product.reviews && product.reviews.map((review)=>{
                          return (<ReviewCard review={review}/>)
                      })}
                  </div>
              ):(<><p className="noReviews">No Review Yet</p></>)
            }
          </Fragment>)
    }
   </Fragment>
  );
};

export default ProductDetails;
