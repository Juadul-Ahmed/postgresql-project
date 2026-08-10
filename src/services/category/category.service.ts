import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { successResponse, errorResponse } from "../../lib/response";

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      where: { isDeleted: false },
      orderBy: { name: "asc" },
    });

    successResponse(res, "Categories retrieved successfully", categories);
  } catch (error) {
    errorResponse(res, "Failed to retrieve categories", 500, (error as Error).message);
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findFirst({
      where: { id: id as string, isDeleted: false },
    });

    if (!category) {
      errorResponse(res, "Category not found", 404);
      return;
    }

    successResponse(res, "Category retrieved successfully", category);
  } catch (error) {
    errorResponse(res, "Failed to retrieve category", 500, (error as Error).message);
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;

    const existingCategory = await prisma.category.findFirst({
      where: { name: name as string, isDeleted: false },
    });

    if (existingCategory) {
      errorResponse(res, "Category already exists", 400);
      return;
    }

    const category = await prisma.category.create({
      data: { name: name as string, description },
    });

    successResponse(res, "Category created successfully", category, 201);
  } catch (error) {
    errorResponse(res, "Failed to create category", 500, (error as Error).message);
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const existingCategory = await prisma.category.findFirst({
      where: { id: id as string, isDeleted: false },
    });

    if (!existingCategory) {
      errorResponse(res, "Category not found", 404);
      return;
    }

    const category = await prisma.category.update({
      where: { id: id as string },
      data: {
        name: (name as string) || existingCategory.name,
        description: description !== undefined ? description : existingCategory.description,
      },
    });

    successResponse(res, "Category updated successfully", category);
  } catch (error) {
    errorResponse(res, "Failed to update category", 500, (error as Error).message);
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const existingCategory = await prisma.category.findFirst({
      where: { id: id as string, isDeleted: false },
    });

    if (!existingCategory) {
      errorResponse(res, "Category not found", 404);
      return;
    }

    await prisma.category.update({
      where: { id: id as string },
      data: { isDeleted: true },
    });

    successResponse(res, "Category deleted successfully");
  } catch (error) {
    errorResponse(res, "Failed to delete category", 500, (error as Error).message);
  }
};
