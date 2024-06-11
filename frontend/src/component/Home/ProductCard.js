import React from 'react'
import { Link } from "react-router-dom";
import Rating from "react-rating-stars-component";
import images from "../../images/cover.jfif" 
const Product = ({ product }) => {
    const options = {
        value: product?.product?.ratings,
        readOnly: true,
        precision: 0.5,
        edit:false,
        
    };
    return (
        
        <Link className="productCard" to={`/product/${product?.product?._id}`}>
            <img src={product?.product?.images[0]?.url} alt={product?.product?.name} />
            <p>{product?.product?.name}</p>
            <div>
                <Rating {...options} />{" "}
                <span className="productCardSpan">
                    {" "}
                    ({product?.product?.numOfReviews} Reviews)
                </span>
            </div>
            <span>{`₹${product?.product?.price}`}</span>
        </Link>
        
    )
}

export default Product
