import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
// import authRoutes from './routes/auth';
// import laptopRoutes from './routes/laptops';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/laptops', laptopRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});