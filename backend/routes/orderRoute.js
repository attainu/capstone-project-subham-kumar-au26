const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder, } = require("../controllers/orderController");
const { isAuthenticatedUser, admin } = require('../middleware/authentication');
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/admin/orders").get(isAuthenticatedUser, admin("admin"), getAllOrders);
router.route("/admin/order/:id").put(isAuthenticatedUser, admin("admin"), updateOrder);
router.route("/admin/order/:id").delete(isAuthenticatedUser, admin("admin"), deleteOrder);

module.exports = router;