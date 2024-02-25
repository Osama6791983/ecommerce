import React from 'react'

import { ADD_TO_CARTs, REMOVE_CART_ITEM, SHIPPING_INFO } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [],shippingInfo:{} }, action) => {
    switch (action.type) {
        case ADD_TO_CARTs:

            const item = action.payload;
            const isExist = state.cartItems.find((i) => {
                return (
                    i.product === item.product
                )
            });

            if (isExist) {
                return (
                    {
                        ...state,
                        cartItems: state.cartItems.map((i) => {
                            return (
                                i.product === isExist.product ? item : i
                            )
                        })
                    }
                )
            } else {
                return (
                    {
                        ...state,
                        cartItems: [...state.cartItems, item]
                    }
                )
            }
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => {
                    return (i.product !== action.payload);
                })
            }
            case SHIPPING_INFO:
                return {
                    ...state,
                    shippingInfo : action.payload
                }

        default:
            return state;
    }
}


