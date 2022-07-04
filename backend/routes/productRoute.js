const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, productDetials, createProductReview, getProductReviews, deleteReview } = require('../controllers/productController');
const { isAuthenticatedUser, admin } = require('../middleware/authentication');
const router = express.Router();


router.route('/products').get(getAllProducts);
router.route('/admin/product/new').post(isAuthenticatedUser, admin("admin"), createProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser, admin("admin"), updateProduct);
router.route('/admin/product/:id').delete(isAuthenticatedUser, admin("admin"), deleteProduct);
router.route('/product/:id').get(productDetials);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews)
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);



module.exports = router; 