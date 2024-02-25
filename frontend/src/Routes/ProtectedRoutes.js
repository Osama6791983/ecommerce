import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min'

const ProtectedRoutes = ({ component: Component, ...rest }) => {
    const { user, loading, isAuthenticated } = useSelector(state => state.user)
    return (
        <Fragment>
            {
                !loading && (
                    <Route {...rest} render={(props) => {
                        if (!isAuthenticated) {
                           
                            return <Redirect to={"/login"} />

                        }
                        
                        return <Component {...props} />
                    }} />
                )
            }
        </Fragment>
    )
}

export default ProtectedRoutes
