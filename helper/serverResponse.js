export function successResponse(res, data = null, message) {
  res.status(200).json({
    status: 200,
    message,
    error: false,
    data,
  });
}

export function errorResponse(res, statusCode, message) {
  res.status(statusCode).json({
    status: statusCode,
    message,
    error: true,
    data: null,
  });
}
