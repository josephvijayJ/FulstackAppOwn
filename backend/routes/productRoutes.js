import express from 'express';

import {
  getProductById,
  getProducts,
  reviewProduct,
  searchProduct,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// router.route('/allproducts').get(getProducts);

router.get('/', getProducts);
router.route('/:id/reviews').post(protect, reviewProduct);
router.route('/:id').get(getProductById);
router.route('/search/:keyword').get(searchProduct);
export default router;
