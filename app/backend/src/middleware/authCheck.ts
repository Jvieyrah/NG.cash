import { Request, Response, NextFunction } from 'express';
// import { ErrorRequestHandler } from 'express';
 import StructuredError from '../errors/StructuredError';
 

const authCheck = ( req: Request, res: Response, next: NextFunction) => {
  // try{
  const token: string | any = req.headers.authorization;
  if (!token) {
    throw new StructuredError('Token not found', 401);
  }
  // const user = tokenManager.verifyToken(token);
  next();
  // } catch (error) {
  //   next(new StructuredError(err.message, 500));
  // }
};

export default authCheck;
