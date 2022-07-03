const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetpassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, admin } = require('../middleware/authentication');
const router = express.Router();


router.route('/register').post(registerUser);

router.route('/login').post(loginUser)

router.route('/logout').get(logout)

router.route('/password/forgot').post(forgotPassword)

router.route('/password/reset/:token').put(resetpassword)

router.route('/me').get(isAuthenticatedUser, getUserDetails)

router.route('/password/update').put(isAuthenticatedUser, updatePassword)

router.route('/me/update').put(isAuthenticatedUser, updateProfile)

router.route("/admin/users").get(isAuthenticatedUser, admin('admin'), getAllUser);

router.route("/admin/user/:id").get(isAuthenticatedUser, admin("admin"), getSingleUser)

router.route("/admin/user/:id").put(isAuthenticatedUser, admin("admin"), updateUserRole)

router.route("/admin/user/:id").delete(isAuthenticatedUser, admin("admin"), deleteUser);

module.exports = router; 