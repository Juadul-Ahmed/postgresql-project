import { Response } from "express";
import { ApiResponse } from "./types";

export const successResponse = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = 200
): Response<ApiResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  } as ApiResponse<T>);
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 400,
  error?: string
): Response<ApiResponse> => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  } as ApiResponse);
};
