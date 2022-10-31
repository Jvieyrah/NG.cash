import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, req, res, _next) => {
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  if (err.message === 'invalid signature'
   || err.message === 'jwt expired'
   || err.message === 'jwt malformed'
   || err.message === 'invalid token'
  ) {
    return res.status(401).send({ message: 'Token must be a valid token' });
  }
  return res.status(500).send({ message: err.message });
};

export default errorMiddleware;
