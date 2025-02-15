import express, { Router, Request, Response } from 'express';
import { signup, login } from '../controllers/authController';
import type { SignupData } from '../models/signup';

const router: Router = express.Router();

interface LoginRequest {
  email: string;
  password: string;
}

const signupHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await signup(req.body as SignupData);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Email already registered') {
        res.status(400).json({ 
          message: 'Email already exists. Please login or use a different email.'
        });
        return;
      }
    }
    res.status(500).json({
      message: 'Internal server error during signup'
    });
  }
};

const loginHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await login(req.body as LoginRequest);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      message: error instanceof Error ? error.message : 'Invalid credentials'
    });
  }
};

// Register routes
router.post('/signup', signupHandler);
router.post('/login', loginHandler);

export default router; 