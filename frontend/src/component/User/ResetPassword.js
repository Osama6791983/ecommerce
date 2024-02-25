import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import { clearErrors, resetPassword } from '../../actions/userAction';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from "@material-ui/icons/Lock";
import { useDispatch, useSelector } from 'react-redux';
import "./ResetPassword.css"
const ResetPassword = ({ history, match }) => {
    const dispatch = useDispatch();
    const { loading , success , error}= useSelector((state)=>state.forgetPassword)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(resetPassword(match.params.token, myForm));
    };
    useEffect(() => {
      if(error){
        alert(error);
        dispatch(clearErrors())
      }
      if(success){
        alert("Password Update Successfully");
        history.push("/login")
        dispatch({type:"UPDATE_PASSWORD_RESET"})
      }
    }, [error,dispatch,success,history])
    
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Change Password" />
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading">Update Profile</h2>

                            <form
                                className="resetPasswordForm"
                                onSubmit={resetPasswordSubmit}
                            >
                                <div>
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockIcon />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="resetPasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ResetPassword
