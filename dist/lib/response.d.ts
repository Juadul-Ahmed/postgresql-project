import { Response } from "express";
import { ApiResponse } from "./types";
export declare const successResponse: <T>(res: Response, message: string, data?: T, statusCode?: number) => Response<ApiResponse<T>>;
export declare const errorResponse: (res: Response, message: string, statusCode?: number, error?: string) => Response<ApiResponse>;
//# sourceMappingURL=response.d.ts.map