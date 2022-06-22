const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, productDetials } = require('../controllers/productController');
const { isAuthenticatedUser } = require('../middleware/authentication');
const router = express.Router();


router.route('/products').get(getAllProducts);
router.route('/product/new').post(isAuthenticatedUser, createProduct);
router.route('/product/:id').put(isAuthenticatedUser, updateProduct);
router.route('/product/:id').delete(isAuthenticatedUser, deleteProduct);
router.route('/product/:id').get(productDetials);



module.exports = router; 