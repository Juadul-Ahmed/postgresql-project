import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { successResponse, errorResponse } from "../../lib/response";

export const getReviewsByProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    const reviews = await prisma.review.findMany({
      where: { productId: productId as string, isDeleted: false },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    successResponse(res, "Reviews retrieved successfully", reviews);
  } catch (error) {
    errorResponse(res, "Failed to retrieve reviews", 500, (error as Error).message);
  }
};

export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const user = (req as any).user;

    const product = await prisma.product.findFirst({
      where: { id: productId as string, isDeleted: false },
    });

    if (!product) {
      errorResponse(res, "Product not found", 404);
      return;
    }

    const existingReview = await prisma.review.findFirst({
      where: { productId: productId as string, userId: user.id, isDeleted: false },
    });

    if (existingReview) {
      errorResponse(res, "You have already reviewed this product", 400);
      return;
    }

    const review = await prisma.review.create({
      data: {
        rating: rating as number,
        comment,
        productId: productId as string,
        userId: user.id,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    successResponse(res, "Review created successfully", review, 201);
  } catch (error) {
    errorResponse(res, "Failed to create review", 500, (error as Error).message);
  }
};

export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const user = (req as any).user;

    const existingReview = await prisma.review.findFirst({
      where: { id: id as string, isDeleted: false },
    });

    if (!existingReview) {
      errorResponse(res, "Review not found", 404);
      return;
    }

    if (existingReview.userId !== user.id && user.role !== "ADMIN") {
      errorResponse(res, "You can only update your own reviews", 403);
      return;
    }

    const review = await prisma.review.update({
      where: { id: id as string },
      data: {
        rating: rating as number || existingReview.rating,
        comment: comment !== undefined ? comment : existingReview.comment,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    successResponse(res, "Review updated successfully", review);
  } catch (error) {
    errorResponse(res, "Failed to update review", 500, (error as Error).message);
  }
};

export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    const existingReview = await prisma.review.findFirst({
      where: { id: id as string, isDeleted: false },
    });

    if (!existingReview) {
      errorResponse(res, "Review not found", 404);
      return;
    }

    if (existingReview.userId !== user.id && user.role !== "ADMIN") {
      errorResponse(res, "You can only delete your own reviews", 403);
      return;
    }

    await prisma.review.update({
      where: { id: id as string },
      data: { isDeleted: true },
    });

    successResponse(res, "Review deleted successfully");
  } catch (error) {
    errorResponse(res, "Failed to delete review", 500, (error as Error).message);
  }
};
