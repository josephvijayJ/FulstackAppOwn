import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(401);
    throw new Error('No Products Found');
  }
});

// @desc Fetch Single product
// @route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById({ _id: req.params.id });
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Create new review
// @route POST /api/products/:id/review
//@access private
const reviewProduct = asyncHandler(async (req, res) => {
  console.log('userprofiledetails', req.userProfileDetails);
  const { rating, comment } = req.body;
  const product = await Product.findById({ _id: req.params.id });
  if (product) {
    const updatedProduct = product.reviews.find(
      (r) => r.user.toString() === req.userProfileDetails._id.toString()
    );
    if (updatedProduct) {
      res.status(401);
      throw new Error('The product is already reviewed');
    }

    const review = {
      name: req.userProfileDetails.name,
      rating: Number(rating),
      comment,
      user: req.userProfileDetails._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc DISPLAYING search product
// @route GET /api/products/:keyword
//@access Public
const searchProduct = asyncHandler(async (req, res) => {
  console.log('product search controller');
  const SearchedWord = req.params.keyword
    ? {
        name: {
          $regex: req.params.keyword,
          $options: 'i',
        },
      }
    : {};
  console.log({ ...SearchedWord });
  const product = await Product.findOne({ ...SearchedWord });
  console.log(product);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById, reviewProduct, searchProduct };
