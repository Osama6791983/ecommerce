import React, { useState } from 'react'
import { Fragment } from 'react'
import "./Search.css"
const Search = ({history}) => {
    const [Keyword, setKeyword] = useState("")
    const searchSubmitHandler = async(e)=>{
        e.preventDefault();
        if (Keyword.trim()) {
            history.push(`/products/${Keyword}`)
        }else{
            history.push(`/products`)
        }
    }
  return (
    <Fragment>
     <form className='searchBox' onSubmit={searchSubmitHandler}>
    <input type='text' placeholder='Search a Product ...' 
    onChange={(e)=>{return setKeyword(e.target.value)}}/>
     </form>
    </Fragment>
  )
}

export default Search
