import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL } from "../constants/productConstants"
import axios from "axios"
export const getProduct = (keyword="",currentPage=1,category,ratings=0)=>async (dispach)=>{
    try {
        dispach({type:ALL_PRODUCT_REQUEST});
        // console.log(`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`);
        let link = `/api/v1/products?keyword=${keyword}&ratings[gte]=${ratings}`
        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}&ratings[gte]=${ratings}`
        }
        const {data} = await axios.get(link)
       
        dispach({
            type: ALL_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispach({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        }) 
    }
}
//get single product details
export const getProductDetails = (id)=>async (dispach)=>{
    try {
        dispach({type:PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/v1/product/${id}`)
        
        dispach({
            type: PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
    } catch (error) {
        dispach({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        }) 
    }
}
//CLEARING ERRORS
export const clearErrors = ()=>async (dispach)=>{
    dispach({type:CLEAR_ERRORS})
}