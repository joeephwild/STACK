import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createAuth, type VerifyLoginPayloadParams } from 'thirdweb/auth';
import { privateKeyToAccount } from 'thirdweb/wallets';
import { thirdwebClient } from '../thirdwebClient';
import { getOrCreateUser } from '../services/userService';
import { z } from 'zod';

const router = express.Router();

// Validation schemas
const LoginQuerySchema = z.object({
  address: z.string().min(1, 'Address is required'),
  chainId: z.string().optional(),
});

const LoginPayloadSchema = z.object({
  payload: z.object({
    address: z.string(),
    chainId: z.number().optional(),
    domain: z.string(),
    expirationTime: z.string(),
    issuedAt: z.string(),
    nonce: z.string(),
    statement: z.string().optional(),
    uri: z.string(),
    version: z.string(),
  }),
  signature: z.string(),
});

const RegisterSchema = z.object({
  displayName: z.string().min(1, 'Display name is required').optional(),
  email: z.string().email('Invalid email format').optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().url('Invalid avatar URL').optional(),
});

// Initialize Thirdweb Auth
const thirdwebAuth = createAuth({
  domain: process.env.CLIENT_DOMAIN || 'localhost:3001',
  client: thirdwebClient,
  adminAccount: privateKeyToAccount({
    client: thirdwebClient,
    privateKey: process.env.ADMIN_PRIVATE_KEY!,
  }),
});

/**
 * @route GET /api/auth/login
 * @desc Generate login payload for wallet authentication
 * @access Public
 */
router.get('/login', async (req, res) => {
  try {
    const validatedQuery = LoginQuerySchema.parse(req.query);
    const { address, chainId } = validatedQuery;

    const payload = await thirdwebAuth.generatePayload({
      address,
      chainId: chainId ? parseInt(chainId) : undefined,
    });

    res.status(200).json(payload);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid request parameters',
        details: error.errors,
      });
    }

    console.error('Error generating login payload:', error);
    res.status(500).json({ error: 'Failed to generate login payload' });
  }
});

/**
 * @route POST /api/auth/login
 * @desc Verify login payload and generate JWT with user creation
 * @access Public
 */
router.post('/login', async (req, res) => {
  try {
    const validatedPayload = LoginPayloadSchema.parse(req.body);

    const verifiedPayload = await thirdwebAuth.verifyPayload(validatedPayload);

    if (verifiedPayload.valid) {
      const jwt = await thirdwebAuth.generateJWT({
        payload: verifiedPayload.payload,
      });

      // Get or create user in database
      const user = await getOrCreateUser(verifiedPayload.payload.address);

      // Set secure HTTP-only cookie
      res.cookie('jwt', jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      return res.status(200).json({
        success: true,
        token: jwt,
        address: verifiedPayload.payload.address,
        user: {
          id: user.id,
          walletAddress: user.walletAddress,
          displayName: user.displayName,
          email: user.email,
          bio: user.bio,
          avatarUrl: user.avatarUrl,
          isCurator: user.isCurator,
          createdAt: user.createdAt,
        },
        isNewUser: user.createdAt.getTime() === user.updatedAt.getTime(),
      });
    }

    res.status(401).json({ error: 'Invalid authentication payload' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid request payload',
        details: error.errors,
      });
    }

    console.error('Error verifying login:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

/**
 * @route POST /api/auth/register
 * @desc Complete user registration with additional profile data
 * @access Public (requires valid JWT)
 */
router.post('/register', async (req, res) => {
  try {
    // Check for JWT token
    const jwt = req.cookies?.jwt || req.headers.authorization?.replace('Bearer ', '');

    if (!jwt) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Verify JWT
    const authResult = await thirdwebAuth.verifyJWT({ jwt });

    if (!authResult.valid) {
      return res.status(401).json({ error: 'Invalid authentication token' });
    }

    const validatedData = RegisterSchema.parse(req.body);
    const walletAddress = authResult.parsedJWT.sub!;

    // Update user with additional profile data
    const user = await getOrCreateUser(walletAddress, validatedData);

    res.status(200).json({
      success: true,
      message: 'User registration completed successfully',
      user: {
        id: user.id,
        walletAddress: user.walletAddress,
        displayName: user.displayName,
        email: user.email,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
        isCurator: user.isCurator,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: error.errors,
      });
    }

    console.error('Error completing registration:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

/**
 * @route GET /api/auth/status
 * @desc Check authentication status
 * @access Public
 */
router.get('/status', async (req, res) => {
  try {
    const jwt = req.cookies?.jwt;

    if (!jwt) {
      return res.status(200).json({ isAuthenticated: false });
    }

    const authResult = await thirdwebAuth.verifyJWT({ jwt });

    if (!authResult.valid) {
      return res.status(200).json({ isAuthenticated: false });
    }

    return res.status(200).json({
      isAuthenticated: true,
      address: authResult.parsedJWT.sub,
    });
  } catch (error) {
    console.error('Error checking auth status:', error);
    res.status(500).json({ error: 'Failed to check authentication status' });
  }
});

/**
 * @route POST /api/auth/logout
 * @desc Logout user and clear JWT cookie
 * @access Public
 */
router.post('/logout', (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

export { router as authRouter };
