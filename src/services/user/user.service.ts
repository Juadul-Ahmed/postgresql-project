import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { successResponse, errorResponse } from "../../lib/response";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    successResponse(res, "Users retrieved successfully", users);
  } catch (error) {
    errorResponse(res, "Failed to retrieve users", 500, (error as Error).message);
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findFirst({
      where: { id: id as string, isDeleted: false },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      errorResponse(res, "User not found", 404);
      return;
    }

    successResponse(res, "User retrieved successfully", user);
  } catch (error) {
    errorResponse(res, "Failed to retrieve user", 500, (error as Error).message);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: { id: id as string, isDeleted: false },
    });

    if (!existingUser) {
      errorResponse(res, "User not found", 404);
      return;
    }

    const user = await prisma.user.update({
      where: { id: id as string },
      data: {
        name: name || existingUser.name,
        email: email || existingUser.email,
        role: role || existingUser.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    successResponse(res, "User updated successfully", user);
  } catch (error) {
    errorResponse(res, "Failed to update user", 500, (error as Error).message);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const existingUser = await prisma.user.findFirst({
      where: { id: id as string, isDeleted: false },
    });

    if (!existingUser) {
      errorResponse(res, "User not found", 404);
      return;
    }

    await prisma.user.update({
      where: { id: id as string },
      data: { isDeleted: true },
    });

    successResponse(res, "User deleted successfully");
  } catch (error) {
    errorResponse(res, "Failed to delete user", 500, (error as Error).message);
  }
};
