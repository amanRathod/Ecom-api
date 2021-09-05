const express = require('express');
const router = express.Router();
const { body, buildCheckFunction, checkSchema } = require('express-validator');
const sanitizeBodyAndQuery = buildCheckFunction(['body', 'query']);
const productController = require('../../../controller/api/v1/product-controller');

router.post('/create', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('price').not().isEmpty().withMessage('Price is required'),
    body('quantity')
      .isFloat({ gt: 0 })
      .withMessage('Quantity must be greater than 0'),      
], productController.createProducts);

router.get('/all', productController.getProucts);

router.put('/update/:id', sanitizeBodyAndQuery('id').toInt(), productController.updateProduct);

router.delete('/delete/:id', sanitizeBodyAndQuery('id').toInt(), productController.deleteProduct);

router.delete('/delete-all', [], productController.deleteAllProducts);

module.exports = router;