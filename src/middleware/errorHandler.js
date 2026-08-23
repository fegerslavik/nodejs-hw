import { HttpError } from 'http-errors';

export const errorHandler = (err, _req, res, _next) => {
  const isHttpError = err instanceof HttpError;
  const status = isHttpError ? err.status : 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({
    message,
  });
};
