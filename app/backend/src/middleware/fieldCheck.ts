import { Request, Response, NextFunction } from 'express';
import StructeredError from '../errors/StructuredError';

type requestedFields = string[];

const fieldCheck = (requestedFields: requestedFields) => (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const { body } = req;
  const isMissingField = requestedFields.some((field) => !body[field]);
  if (isMissingField) {
    throw new StructeredError('Missing field', 400);
  }
  next();
};

export default fieldCheck;
