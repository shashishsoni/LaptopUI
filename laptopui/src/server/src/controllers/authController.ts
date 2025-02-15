import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import prisma from '../config/database';
import { hashPassword, verifyPassword } from '../utils/password';
import jwt from 'jsonwebtoken';
import { SignupData } from '../models/signup';
import { generateToken } from '../utils/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

interface LoginData {
  email: string;
  password: string;
}

export const signup = async (data: SignupData) => {
  try {
    // First check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await hashPassword(data.password);
    
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName,
        role: 'USER'
      }
    });

    // Remove password from response using object destructuring
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    // Generate JWT token
    const token = generateToken(user.id);

    return {
      user: userWithoutPassword,
      token
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('Email already registered');
      }
    }
    throw error;
  }
};

export const login = async (data: LoginData) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const isValidPassword = await verifyPassword(data.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }
    
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName
      },
      token
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
}; 