const ProductModel =  require('../../../model/Product');
const validationResult = require('express-validator').validationResult;
// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.createProducts = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array()
      });
    }
    const product = await ProductModel.create(req.body);
    return res.status(201).json({
      success: 'Product created successfully',
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

exports.getProucts = async (req, res, next) => {
  try {
    const products = await ProductModel.find();
    return res.status(200).json({
      success: 'Get All Data',
      data: products
    });
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array()
      });
    }
    const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    return res.status(200).json({
      success: 'Product updated successfully',
      data: product
    });
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    return res.status(200).json({
      success: 'Product deleted successfully',
      data: product
    });
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
}

exports.deleteAllProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.deleteMany();
    if (!products) {
      return res.status(404).json({
        success: false,
        error: 'Products not found'
      });
    }
    return res.status(200).json({
      success: 'All Products deleted successfully',
      data: products
    });
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
}