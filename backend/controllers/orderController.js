import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc Create new Order
// @route POST /api/orders
//@access private
const addOrderItems = asyncHandler(async (req, res) => {
  console.log('entered addOrder ITEMS');
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No Order Items');
  } else {
    console.log('userProfileDetails _id', req.userProfileDetails._id);
    const order = new Order({
      user: req.userProfileDetails._id,
      orderItems,
      shippingAddress,
      paymentMethod,

      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc GET Order by id
// @route GET /api/orders/:id
// @access private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc UPDATE Order to paid
// @route GET /api/orders/:id/pay
// @access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_adress: req.body.email_address,
    };
    //?above payment result object for paypal thing
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc GET logged in userOrder
// @route GET /api/orders/myorders
// @access private
const getMyOrders = asyncHandler(async (req, res) => {
  console.log('entered Myorder details');
  const orders = await Order.find({ user: req.userProfileDetails._id });
  res.json(orders);
});

// @desc GET all Orders
// @route GET /api/orders
// @access private/admin
const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 5;
  //pageSize refers to how many orders should visible.
  //==> ?pageNumber=2;
  const page = Number(req.query.pageNumber) || 1;

  console.log('entered Allorder ');
  const count = await Order.count();
  const orders = await Order.find({})
    .populate('user', 'id name email')
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ orders, page, pages: Math.ceil(count / pageSize) });
});

// @desc UPDATE Order to DELIVER
// @route GET /api/orders/:id
// @access private/admin
const updateOrderToDeliver = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  console.log(order);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    //?above payment result object for paypal thing

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const mongoAggregation = asyncHandler(async (req, res) => {
  console.log('entered date aggree');
  const date = req.body.date;
  console.log(date);
  console.log(date);
  const orders = await Order.aggregate([
    { $match: { createdAt: { $lte: date } } },

    // Stage 2: Group remaining documents by date and calculate results
    // {
    //   $group: {
    //     _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
    //     totalOrderValue: { $sum: '$totalPrice' },
    //     averageOrderQuantity: { $avg: '$qty' },
    //   },
    // },
    // // Stage 3: Sort documents by totalOrderValue in descending order
    // {
    //   $sort: { totalOrderValue: -1 },
    // },
  ]);
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDeliver,
  mongoAggregation,
};
