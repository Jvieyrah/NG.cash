import { Request, Response, NextFunction } from 'express';
import StructuredError from '../errors/StructuredError';

const userCheck = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  // valida se todos os campos estão preenchidos corretamente
  if (!username || !password)
    throw new StructuredError('All fields must be filled', 400);
  if (username.length < 3)
    throw new StructuredError('Username must have at least 3 characters', 400);
  if (password.length < 8)
    throw new StructuredError('Password must have at least 8 characters', 400);
  //  a senha deve ter pelo menos um número e uma letra maiúscula
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(password))
    throw new StructuredError('Password must have at least one uppercase letter and one number', 400);
  next();
}

export default userCheck;
