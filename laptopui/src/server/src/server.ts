import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
// import laptopRoutes from './routes/laptops';
// import { corsOptions } from './config/cors';  

// Load environment variables
dotenv.config();

const app = express();

// Updated CORS configuration for Vercel
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://laptop-ui-phi.vercel.app',
    'https://laptopui.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight requests
app.options('*', cors());

// Parse JSON bodies
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
    
    // Check if port is in use and try alternative
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    }).on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`⚠️ Port ${PORT} is busy, trying ${PORT + 1}`);
        app.listen(PORT + 1, '0.0.0.0', () => {
          console.log(`🚀 Server running on port ${PORT + 1}`);
        });
      } else {
        console.error('❌ Server error:', err);
        process.exit(1);
      }
    });

    // Cleanup on shutdown
    process.on('SIGTERM', () => {
      server.close(() => {
        console.log('👋 Server shutdown complete');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;