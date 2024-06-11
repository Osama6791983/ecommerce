const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, getAllMyOrders, getAllOrdersAdmin, updateOrder, deleteOrder } = require("../controllers/orderController");
//create new order
router.route("/order/new").post(isAuthenticatedUser,newOrder)
router.route("/order/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleOrder)
router.route("/orders/me").get(isAuthenticatedUser,getAllMyOrders)
router.route("/orders/me").get(isAuthenticatedUser,getAllMyOrders)
router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrdersAdmin);
router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder)
module.exports  = router
// hello world