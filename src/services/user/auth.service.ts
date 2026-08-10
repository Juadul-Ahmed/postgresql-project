import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { hashPassword, comparePassword } from "../../lib/bcrypt";
import { generateToken } from "../../lib/jwt";
import { successResponse, errorResponse } from "../../lib/response";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: { email, isDeleted: false },
    });

    if (existingUser) {
      errorResponse(res, "User already exists with this email", 400);
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role === "ADMIN" ? "ADMIN" : "USER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    successResponse(res, "User registered successfully", { user, token }, 201);
  } catch (error) {
    errorResponse(res, "Registration failed", 500, (error as Error).message);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: { email, isDeleted: false },
    });

    if (!user) {
      errorResponse(res, "Invalid email or password", 401);
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      errorResponse(res, "Invalid email or password", 401);
      return;
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    successResponse(res, "Login successful", {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    errorResponse(res, "Login failed", 500, (error as Error).message);
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;

    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    successResponse(res, "Profile retrieved successfully", userData);
  } catch (error) {
    errorResponse(res, "Failed to retrieve profile", 500, (error as Error).message);
  }
};
