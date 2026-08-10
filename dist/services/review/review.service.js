"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviewsByProduct = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const response_1 = require("../../lib/response");
const getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await prisma_1.default.review.findMany({
            where: { productId: productId, isDeleted: false },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        (0, response_1.successResponse)(res, "Reviews retrieved successfully", reviews);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to retrieve reviews", 500, error.message);
    }
};
exports.getReviewsByProduct = getReviewsByProduct;
const createReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { rating, comment } = req.body;
        const user = req.user;
        const product = await prisma_1.default.product.findFirst({
            where: { id: productId, isDeleted: false },
        });
        if (!product) {
            (0, response_1.errorResponse)(res, "Product not found", 404);
            return;
        }
        const existingReview = await prisma_1.default.review.findFirst({
            where: { productId: productId, userId: user.id, isDeleted: false },
        });
        if (existingReview) {
            (0, response_1.errorResponse)(res, "You have already reviewed this product", 400);
            return;
        }
        const review = await prisma_1.default.review.create({
            data: {
                rating: rating,
                comment,
                productId: productId,
                userId: user.id,
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });
        (0, response_1.successResponse)(res, "Review created successfully", review, 201);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to create review", 500, error.message);
    }
};
exports.createReview = createReview;
const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const user = req.user;
        const existingReview = await prisma_1.default.review.findFirst({
            where: { id: id, isDeleted: false },
        });
        if (!existingReview) {
            (0, response_1.errorResponse)(res, "Review not found", 404);
            return;
        }
        if (existingReview.userId !== user.id && user.role !== "ADMIN") {
            (0, response_1.errorResponse)(res, "You can only update your own reviews", 403);
            return;
        }
        const review = await prisma_1.default.review.update({
            where: { id: id },
            data: {
                rating: rating || existingReview.rating,
                comment: comment !== undefined ? comment : existingReview.comment,
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });
        (0, response_1.successResponse)(res, "Review updated successfully", review);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to update review", 500, error.message);
    }
};
exports.updateReview = updateReview;
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const existingReview = await prisma_1.default.review.findFirst({
            where: { id: id, isDeleted: false },
        });
        if (!existingReview) {
            (0, response_1.errorResponse)(res, "Review not found", 404);
            return;
        }
        if (existingReview.userId !== user.id && user.role !== "ADMIN") {
            (0, response_1.errorResponse)(res, "You can only delete your own reviews", 403);
            return;
        }
        await prisma_1.default.review.update({
            where: { id: id },
            data: { isDeleted: true },
        });
        (0, response_1.successResponse)(res, "Review deleted successfully");
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to delete review", 500, error.message);
    }
};
exports.deleteReview = deleteReview;
