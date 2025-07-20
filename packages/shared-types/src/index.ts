import { z } from 'zod';

// User schemas
export const UserSchema = z.object({
  id: z.string(),
  address: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateUserSchema = z.object({
  address: z.string().min(1, 'Address is required'),
});

// Investment schemas
export const InvestmentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.string(),
  tokenSymbol: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateInvestmentSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  amount: z.string().min(1, 'Amount is required'),
  tokenSymbol: z.string().min(1, 'Token symbol is required'),
});

// API Response schemas
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
});

export const HealthCheckSchema = z.object({
  status: z.enum(['healthy', 'unhealthy']),
  timestamp: z.string().datetime(),
  service: z.string(),
  version: z.string(),
  environment: z.string(),
  uptime: z.number().optional(),
  memory: z.any().optional(),
  database: z.string().optional(),
});

// Type exports
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type Investment = z.infer<typeof InvestmentSchema>;
export type CreateInvestment = z.infer<typeof CreateInvestmentSchema>;
export type ApiResponse<T = any> = z.infer<typeof ApiResponseSchema> & { data?: T };
export type HealthCheck = z.infer<typeof HealthCheckSchema>;