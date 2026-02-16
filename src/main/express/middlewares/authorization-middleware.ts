import { unauthorized } from '@/api';
import { env } from '@/main/config';
import { NextFunction, Request, Response } from 'express';

const { secretKey } = env.clerk;

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.auth;

    if (!userId) {
      throw new Error('User not found');
    }

    next();
  } catch (error) {
    const unauthorizedError = unauthorized({
      error,
    });

    return res.status(unauthorizedError.statusCode).json(unauthorizedError.body.toResult());
  }
};
