const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, productDetials } = require('../controllers/productController');
const { isAuthenticatedUser, admin } = require('../middleware/authentication');
const router = express.Router();


router.route('/products').get(getAllProducts);
router.route('/product/new').post(isAuthenticatedUser, admin("admin"), createProduct);
router.route('/product/:id').put(isAuthenticatedUser, admin("admin"), updateProduct);
router.route('/product/:id').delete(isAuthenticatedUser, admin("admin"), deleteProduct);
router.route('/product/:id').get(productDetials);



module.exports = router; 