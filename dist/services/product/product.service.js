"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const response_1 = require("../../lib/response");
const getAllProducts = async (req, res) => {
    try {
        const { categoryId, status, minPrice, maxPrice } = req.query;
        const where = { isDeleted: false };
        if (categoryId)
            where.categoryId = categoryId;
        if (status)
            where.status = status;
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice)
                where.price.gte = parseFloat(minPrice);
            if (maxPrice)
                where.price.lte = parseFloat(maxPrice);
        }
        const products = await prisma_1.default.product.findMany({
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
        (0, response_1.successResponse)(res, "Products retrieved successfully", products);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to retrieve products", 500, error.message);
    }
};
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma_1.default.product.findFirst({
            where: { id: id, isDeleted: false },
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
            (0, response_1.errorResponse)(res, "Product not found", 404);
            return;
        }
        (0, response_1.successResponse)(res, "Product retrieved successfully", product);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to retrieve product", 500, error.message);
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, status, categoryId } = req.body;
        const user = req.user;
        const category = await prisma_1.default.category.findFirst({
            where: { id: categoryId, isDeleted: false },
        });
        if (!category) {
            (0, response_1.errorResponse)(res, "Category not found", 404);
            return;
        }
        const product = await prisma_1.default.product.create({
            data: {
                name: name,
                description,
                price: price,
                stock: stock || 0,
                status: status || "ACTIVE",
                categoryId: categoryId,
                userId: user.id,
            },
            include: {
                category: true,
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });
        (0, response_1.successResponse)(res, "Product created successfully", product, 201);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to create product", 500, error.message);
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, status, categoryId } = req.body;
        const existingProduct = await prisma_1.default.product.findFirst({
            where: { id: id, isDeleted: false },
        });
        if (!existingProduct) {
            (0, response_1.errorResponse)(res, "Product not found", 404);
            return;
        }
        if (categoryId) {
            const category = await prisma_1.default.category.findFirst({
                where: { id: categoryId, isDeleted: false },
            });
            if (!category) {
                (0, response_1.errorResponse)(res, "Category not found", 404);
                return;
            }
        }
        const product = await prisma_1.default.product.update({
            where: { id: id },
            data: {
                name: name || existingProduct.name,
                description: description !== undefined ? description : existingProduct.description,
                price: price || existingProduct.price,
                stock: stock !== undefined ? stock : existingProduct.stock,
                status: status || existingProduct.status,
                categoryId: categoryId || existingProduct.categoryId,
            },
            include: {
                category: true,
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });
        (0, response_1.successResponse)(res, "Product updated successfully", product);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to update product", 500, error.message);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const existingProduct = await prisma_1.default.product.findFirst({
            where: { id: id, isDeleted: false },
        });
        if (!existingProduct) {
            (0, response_1.errorResponse)(res, "Product not found", 404);
            return;
        }
        await prisma_1.default.product.update({
            where: { id: id },
            data: { isDeleted: true },
        });
        (0, response_1.successResponse)(res, "Product deleted successfully");
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to delete product", 500, error.message);
    }
};
exports.deleteProduct = deleteProduct;
