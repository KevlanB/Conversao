function errorHandler(err, req, res, next) {
  console.error('Global Error:', err);

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Erro interno no servidor' : err.message;

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = errorHandler;