const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    description: 'High-quality wireless headphones with noise cancellation.',
    brand: 'AudioTech',
    category: 'Electronics',
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Smartphone 4K Camera',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
    description: 'Latest smartphone with amazing 4k camera features.',
    brand: 'TechCorp',
    category: 'Electronics',
    price: 699.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Gaming Mouse',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop',
    description: 'Ergonomic gaming mouse with customizable RGB lighting.',
    brand: 'GamerGear',
    category: 'Electronics',
    price: 49.99,
    countInStock: 20,
    rating: 4.8,
    numReviews: 24,
  },
  {
    name: 'Mechanical Keyboard',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop',
    description: 'Tactile mechanical keyboard for typing and gaming.',
    brand: 'KeyChron',
    category: 'Electronics',
    price: 119.99,
    countInStock: 15,
    rating: 4.7,
    numReviews: 30,
  },
  {
    name: 'Smartwatch Series 5',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    description: 'Keep track of your health and notifications on the go.',
    brand: 'Apple',
    category: 'Electronics',
    price: 299.99,
    countInStock: 0,
    rating: 4.6,
    numReviews: 45,
  },
  {
    name: '4K Ultra HD Smart TV',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1000&auto=format&fit=crop',
    description: 'Experience stunning visuals with this 4K UHD TV.',
    brand: 'Samsung',
    category: 'Electronics',
    price: 499.99,
    countInStock: 5,
    rating: 4.9,
    numReviews: 10,
  },
  {
    name: 'Portable Bluetooth Speaker',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop',
    description: 'Take your music anywhere with this portable speaker.',
    brand: 'JBL',
    category: 'Electronics',
    price: 59.99,
    countInStock: 25,
    rating: 4.4,
    numReviews: 18,
  },
  {
    name: 'Noise-Cancelling Earbuds',
    image: 'https://images.unsplash.com/photo-1572569433496-f14d8bdc07a0?q=80&w=1000&auto=format&fit=crop',
    description: 'Compact earbuds with active noise cancellation.',
    brand: 'Sony',
    category: 'Electronics',
    price: 149.99,
    countInStock: 12,
    rating: 4.3,
    numReviews: 22,
  },
  {
    name: 'Digital SLR Camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
    description: 'Professional DSLR camera with versatile lenses.',
    brand: 'Canon',
    category: 'Cameras',
    price: 899.99,
    countInStock: 3,
    rating: 4.8,
    numReviews: 15,
  },
  {
    name: 'Laptop Backpack',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
    description: 'Durable backpack with dedicated laptop compartment.',
    brand: 'SwissGear',
    category: 'Accessories',
    price: 39.99,
    countInStock: 30,
    rating: 4.5,
    numReviews: 50,
  }
];

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
];

const importData = async () => {
  await connectDB();
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();
