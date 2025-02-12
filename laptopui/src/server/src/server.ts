import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import { corsOptions } from './config/cors';
// import laptopRoutes from './routes/laptops';

// Load environment variables
dotenv.config();

const app = express();

// CORS Configuration
app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/laptops', laptopRoutes);

// Connect to Database
connectDB()
  .then(() => {
    console.log('✅ Database connected successfully');
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  });

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Handle server shutdown
process.on('SIGTERM', async () => {
  console.log('Shutting down server...');
  process.exit(0);
});