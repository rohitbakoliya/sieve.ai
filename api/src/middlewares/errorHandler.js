import httpStatus from 'http-status-codes';

/**
 * NOT_FOUND:404 - middleware to catch error response
 */
export const notFoundErrorHandler = (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    error: httpStatus.getStatusText(httpStatus.NOT_FOUND),
  });
};
/**
 * METHOD_NOT_ALLOWED: 405 - middleware to catch error response.
 * It should be placed at the very bottom of the middleware stack.
 */
export const methodNotAllowed = (req, res) => {
  res.status(httpStatus.METHOD_NOT_ALLOWED).json({
    error: httpStatus.getStatusText(httpStatus.METHOD_NOT_ALLOWED),
  });
};

/**
 * Generic error response middleware
 */
export const genericErrorHandler = (err, req, res) => {
  console.log(err);
  if (err instanceof SyntaxError) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Something broke!');
  } else {
    res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message || httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR),
    });
  }
};
