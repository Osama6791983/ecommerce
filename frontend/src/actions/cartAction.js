import axios from "axios"
import { ADD_TO_CARTs, REMOVE_CART_ITEM, SHIPPING_INFO } from "../constants/cartConstants";
export const Add_to_cart = (id, quantity) => {
    return (
        async (dispatch,getState) => {
            const { data } = await axios.get(`/api/v1/product/${id}`);
            dispatch({
                type: ADD_TO_CARTs,
                payload: {
                    product: data.product._id,
                    name: data.product.name,
                    price: data.product.price,
                    image: data.product.images[0].url,
                    stock: data.product.stock,
                    quantity,
                }
            });
            localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
        }
    )
}

//remove item form cart
export const removeItemFromCart = (id) => {
    return (
        async (dispatch,getState) => {
            const { data } = await axios.get(`/api/v1/product/${id}`);
            dispatch({
                type: REMOVE_CART_ITEM,
                payload: id
            });
            localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
        }
    )
}
//save shipping info
export const shippingInfoAction = (data) => {
    return (
        async (dispatch,getState) => {
            
            dispatch({
                type: SHIPPING_INFO,
                payload: data
            });
            localStorage.setItem("shippingInfo",JSON.stringify(data))
        }
    )
}