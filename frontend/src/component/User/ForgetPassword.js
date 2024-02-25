import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgetPasswordAction } from '../../actions/userAction';
import "./ForgetPassword.css"

const ForgetPassword = () => {
    const { loading, error,message } = useSelector((state) => state.forgetPassword);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgetPasswordAction(myForm));
    };
    useEffect(() => {
        if (error) {
            alert(error)
            dispatch(clearErrors())
        }
        if (message) {
            alert(message)
        }
    }, [error, message, dispatch,])

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Forgot Password" />
                    <div className="forgotPasswordContainer">
                        <div className="forgotPasswordBox">
                            <h2 className="forgotPasswordHeading">Forgot Password</h2>

                            <form
                                className="forgotPasswordForm"
                                onSubmit={forgotPasswordSubmit}
                            >
                                <div className="forgotPasswordEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Send"
                                    className="forgotPasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ForgetPassword
