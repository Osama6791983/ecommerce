import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS
,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL } from "../constants/productConstants"


export const productReducer = (state = { products: []}, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerpage:action.payload.resultPerpage
            }
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                products: action.payload
            }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }

        default:
            return state;
    }
}


export const productdDetailsReducer = (state = { product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
                
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                product: action.payload
            }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }

        default:
            return state;
    }
}