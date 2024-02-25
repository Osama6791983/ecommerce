import React, { useEffect } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { Route, BrowserRouter as Router } from "react-router-dom";
import webFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignup.js";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";
import UpdatePassword from "./component/User/UpdatePassword.js";
import UserOption from "./component/layout/Header/UserOption.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import UpdateProfile from "./component/User/UpdateProfile.js";
import ForgetPassword from "./component/User/ForgetPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";

import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    dispatch(loadUser());
  }, []);

  return (
    <Router>
      {/*this is header  */}
      <Header />
      {isAuthenticated && <UserOption user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/login" component={LoginSignUp} />
      <Route exact path="/password/forgot" component={ForgetPassword} />
      <Route path="/password/reset/:token" component={ResetPassword} />
      <Route exact path="/cart" component={Cart} />
      <ProtectedRoutes exact path="/account" component={Profile} />
      <ProtectedRoutes exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoutes
        exact
        path="/password/update"
        component={UpdatePassword}
      />
      <ProtectedRoutes exact path="/shipping" component={Shipping} />
      <Footer />
    </Router>
  );
}

export default App;
