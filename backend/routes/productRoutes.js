import express from 'express';

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  reviewProduct,
  searchProduct,
  updateProduct,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// router.route('/allproducts').get(getProducts);

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, reviewProduct);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
router.route('/search/:keyword').get(searchProduct);

export default router;
