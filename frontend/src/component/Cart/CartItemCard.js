import React, { Fragment } from 'react'
import "./CartItemCard.css"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch } from 'react-redux'
import { removeItemFromCart } from '../../actions/cartAction'
const CartItemCard = ({ item }) => {
  const dispatch=useDispatch();
  return (
    <Fragment>
      <div className="CartItemCard">
        <img src={item.image} alt="ssa" />
        <div>
          <Link to={`/product/${item.product}`}>{item.name}</Link>
          <span>{`Price: ₹${item.price}`}</span>
          <p onClick={()=>{
            dispatch(removeItemFromCart(item.product));
          }}>Remove</p>
        </div>

      </div>
     

    </Fragment>

  )
}

export default CartItemCard
