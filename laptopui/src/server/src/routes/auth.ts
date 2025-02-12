import express from 'express';
import { signup, login } from '../controllers/authController';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const result = await signup(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await login(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

export default router; 