import { Request, Response, NextFunction } from 'express';
// import StructuredError from '../errors/StructuredError';

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  const token: string | any = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }
  next();
};

export default authCheck;
