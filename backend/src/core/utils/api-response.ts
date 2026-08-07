export function successResponse<T>(
  message: string,
  data: T,
  meta?: unknown,
) {
  return {
    success: true,
    message,
    data,
    meta,
    error: null,
  };
}