import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { successResponse, errorResponse } from "../../lib/response";

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId, status, minPrice, maxPrice } = req.query;

    const where: any = { isDeleted: false };

    if (categoryId) where.categoryId = categoryId as string;
    if (status) where.status = status as string;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice as string);
      if (maxPrice) where.price.lte = parseFloat(maxPrice as string);
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: {
          select: { id: true, name: true, description: true },
        },
        user: {
          select: { id: true, name: true, email: true },
        },
        reviews: {
          where: { isDeleted: false },
          select: { id: true, rating: true, comment: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    successResponse(res, "Products retrieved successfully", products);
  } catch (error) {
    errorResponse(res, "Failed to retrieve products", 500, (error as Error).message);
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: { id: id as string, isDeleted: false },
      include: {
        category: true,
        user: {
          select: { id: true, name: true, email: true },
        },
        reviews: {
          where: { isDeleted: false },
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
    });

    if (!product) {
      errorResponse(res, "Product not found", 404);
      return;
    }

    successResponse(res, "Product retrieved successfully", product);
  } catch (error) {
    errorResponse(res, "Failed to retrieve product", 500, (error as Error).message);
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, stock, status, categoryId } = req.body;
    const user = (req as any).user;

    const category = await prisma.category.findFirst({
      where: { id: categoryId as string, isDeleted: false },
    });

    if (!category) {
      errorResponse(res, "Category not found", 404);
      return;
    }

    const product = await prisma.product.create({
      data: {
        name: name as string,
        description,
        price: price as number,
        stock: stock || 0,
        status: (status as "ACTIVE" | "INACTIVE" | "DRAFT") || "ACTIVE",
        categoryId: categoryId as string,
        userId: user.id,
      },
      include: {
        category: true,
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    successResponse(res, "Product created successfully", product, 201);
  } catch (error) {
    errorResponse(res, "Failed to create product", 500, (error as Error).message);
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, status, categoryId } = req.body;

    const existingProduct = await prisma.product.findFirst({
      where: { id: id as string, isDeleted: false },
    });

    if (!existingProduct) {
      errorResponse(res, "Product not found", 404);
      return;
    }

    if (categoryId) {
      const category = await prisma.category.findFirst({
        where: { id: categoryId as string, isDeleted: false },
      });

      if (!category) {
        errorResponse(res, "Category not found", 404);
        return;
      }
    }

    const product = await prisma.product.update({
      where: { id: id as string },
      data: {
        name: (name as string) || existingProduct.name,
        description: description !== undefined ? description : existingProduct.description,
        price: (price as number) || existingProduct.price,
        stock: stock !== undefined ? stock : existingProduct.stock,
        status: (status as "ACTIVE" | "INACTIVE" | "DRAFT") || existingProduct.status,
        categoryId: (categoryId as string) || existingProduct.categoryId,
      },
      include: {
        category: true,
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    successResponse(res, "Product updated successfully", product);
  } catch (error) {
    errorResponse(res, "Failed to update product", 500, (error as Error).message);
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findFirst({
      where: { id: id as string, isDeleted: false },
    });

    if (!existingProduct) {
      errorResponse(res, "Product not found", 404);
      return;
    }

    await prisma.product.update({
      where: { id: id as string },
      data: { isDeleted: true },
    });

    successResponse(res, "Product deleted successfully");
  } catch (error) {
    errorResponse(res, "Failed to delete product", 500, (error as Error).message);
  }
};
