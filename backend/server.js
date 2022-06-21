import express from 'express';
import morgan from 'morgan';
import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import products from './data/products.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
const app = express();
app.use(morgan());
connectDB();
const PAYPAL_CLIENT_ID =
  'AaH8sF765y1Siwh4XwUt8TiIkyGNBcn3WcxB5xO765-vtrGLt2br0MBXDycCsU0T35X_bOooOsmeVt7y';
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Api is running');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) => {
  console.log(PAYPAL_CLIENT_ID);
  res.send(PAYPAL_CLIENT_ID);
});

//?CUSTOM ERROR HANDLING
app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log('server running ');
});
