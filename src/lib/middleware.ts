import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../lib/jwt";
import prisma from "../lib/prisma";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "");

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
        error: "No token provided",
      });
      return;
    }

    const decoded = verifyToken(token);
    prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true, isDeleted: true },
    }).then((user: { id: string; email: string; role: string; isDeleted: boolean } | null) => {
      if (!user || user.isDeleted) {
        res.status(401).json({
          success: false,
          message: "Invalid token or user not found",
        });
        return;
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      next();
    }).catch((error: unknown) => {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "Insufficient permissions",
      });
      return;
    }

    next();
  };
};
