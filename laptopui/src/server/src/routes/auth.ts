import express from 'express';
import { Request, Response } from 'express';
import { signup, login } from '../controllers/authController';

const router = express.Router();

interface AuthRequest extends Request {
  body: {
    email: string;
    password: string;
    fullName: string;
  };
}

router.post('/signup', async (req: AuthRequest, res: Response) => {
  try {
    const result = await signup(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Unknown error' });
  }
});

router.post('/login', async (req: AuthRequest, res: Response) => {
  try {
    const result = await login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router; 