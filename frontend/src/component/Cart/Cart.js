import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import "./Cart.css"
import CartItemCard from './CartItemCard'
import { useDispatch, useSelector } from 'react-redux';

import { Add_to_cart } from './../../actions/cartAction';
// import Typography from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
const Cart = ({ history }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const increaseQuantity = (id, quantity, stock) => {

        if (quantity >= stock) {
            return;
        };
        const newQty = quantity + 1;
        dispatch(Add_to_cart(id, newQty))
    }

    const decreaseQuantity = (id, quantity, stock) => {

        if (quantity <= 1) {
            return;
        }
        const newQty = quantity - 1;
        dispatch(Add_to_cart(id, newQty));

    }
    //check out handler
    const checkouthandler = ()=>{
        history.push("/login?redirect=shipping");
    }
    return (

        <>
            {
                cartItems.length === 0 ? (
                    <div className="emptyCart">
                        <RemoveShoppingCartIcon />

                        No Product in Your Cart
                        <Link to="/products">View Products</Link>
                    </div>


                )

                    :

                    <Fragment>
                        <div className="cartPage">
                            <div className="cartHeader">
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                            </div>

                            {cartItems && cartItems.map((item) => {
                                return (
                                    <div className="cartContainer" key={item.product}>
                                        <CartItemCard item={item} />
                                        <div className="cartInput">
                                            <button onClick={() => { decreaseQuantity(item.product, item.quantity, item.stock) }}>
                                                -
                                            </button>
                                            <input type="text" value={item.quantity} readOnly />
                                            <button onClick={() => { increaseQuantity(item.product, item.quantity, item.stock) }}>
                                                +
                                            </button>
                                        </div>
                                        <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                                    </div>
                                )
                            })}
                            <div className="cartGrossProfit">
                                <div></div>
                                <div className="cartGrossProfitBox">
                                    <p>Gross Total</p>

                                    <p>{`₹${cartItems.reduce((acc, item) => {

                                        return acc + item.quantity * item.price
                                    }, 0)}`}</p>
                                </div>
                                <div></div>
                                <div className="checkOutBtn">
                                    <button onClick={checkouthandler}>Check Out</button>
                                </div>
                            </div>
                        </div>
                    </Fragment>
            }
        </>
    )
}



export default Cart
