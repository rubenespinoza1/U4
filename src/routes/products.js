const { Router } = require('express');
const router = Router();

const ProductController = require('../controllers/ProductController');
const checkProductFields = require('../middlewares/checkProductsFields');

router.get('/products', ProductController.getAllProducts);
router.post('/products', checkProductFields, ProductController.createProduct);
router.get('/products/:id', ProductController.getProductById);
router.put('/products/:id', checkProductFields, ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;