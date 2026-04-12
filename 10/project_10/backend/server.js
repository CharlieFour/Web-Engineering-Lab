import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {family: 4})
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

app.listen(process.env.PORT || 5000, () => console.log('Server running'));