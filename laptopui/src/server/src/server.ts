import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
// import laptopRoutes from './routes/laptops';

// Load environment variables
dotenv.config();

const app = express();

// Configure CORS for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-frontend-domain.com'  // Replace with your Vercel domain
    : 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.static('public')); // Serve static files including videos

// Health check route
app.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/laptops', laptopRoutes);

// Add video serving route
app.get('/video/:filename', (req, res) => {
  res.sendFile(`${__dirname}/public/video/${req.params.filename}`);
});

const PORT = parseInt(process.env.PORT || '5000', 10);

const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ Database connected successfully');
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log('👉 API endpoint:', `http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle server shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully');
  process.exit(0);
});