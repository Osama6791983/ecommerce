import React, { useState } from 'react'
import { Fragment } from 'react'
import "./Header.css"
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { Backdrop } from '@material-ui/core';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import profile from "../../../images/Profile.png"
import { logout } from '../../../actions/userAction';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
const UserOption = ({ user }) => {
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const {cartItems} = useSelector((state)=>state.cart);
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <SpaceDashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function dashboard() {
    history.push("/admin/dashboard");
  }

  function orders() {
    history.push("/orders");
  }
  function account() {
    history.push("/account");
  }
  function cart() {
    history.push("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert("Logout Successfully");
  }
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={<img className='speedDialIcon' alt='profile' src={user.avatar.url ? user.avatar.url : profile} />}
      >

        {
          options.map((item) => (
            <SpeedDialAction key={item.name} icon={item.icon} onClick={item.func} tooltipTitle={item.name} tooltipOpen={true} />
          ))
        }
      </SpeedDial>
    </Fragment>
  )
}

export default UserOption
