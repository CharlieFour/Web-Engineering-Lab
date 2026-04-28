import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/products.js';

dotenv.config();

const app = express();
app.use(cors()); // allow requests from React frontend
app.use(express.json());

app.use('/api/products', productRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

app.listen(process.env.PORT || 5000, () =>
  console.log('Server running on port 5000'));

