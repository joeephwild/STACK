import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// Health check endpoint
router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'STACK Backend API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Detailed health check with database status
router.get('/detailed', async (req, res) => {
  try {
    // TODO: Add database health check when Prisma is configured
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'STACK Backend API',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: 'not_configured', // Will be updated when Prisma is set up
    };

    res.json(healthData);
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Service unavailable',
    });
  }
});

export { router as healthRouter };