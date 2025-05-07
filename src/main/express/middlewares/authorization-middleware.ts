import { unauthorized } from '@/api';
import { env } from '@/main/config';
import { verifyToken } from '@clerk/express';
import { NextFunction, Request, Response } from 'express';

const { secretKey } = env.clerk;

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.__session;

    const result = await verifyToken(token, {
      secretKey,
    });

    next();
  } catch (error) {
    const unauthorizedError = unauthorized({
      error,
    });

    return res.status(unauthorizedError.statusCode).json(unauthorizedError.body.toResult());
  }
};
