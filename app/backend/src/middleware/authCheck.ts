import { Request, Response, NextFunction } from 'express';
import tokenManager from '../helpers/tokenManager';
import StructuredError from '../errors/StructuredError';

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  const token: string | any = req.headers.authorization;
  if (!token) {
    throw new StructuredError('Token must be a valid token', 401);
  }
  const user = tokenManager.verifyToken(token);
  if (!user) {
    throw new StructuredError('Token must be a valid token', 401);
  }
  next();
};

export default authCheck;
