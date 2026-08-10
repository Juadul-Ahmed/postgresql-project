"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const response_1 = require("../../lib/response");
const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma_1.default.category.findMany({
            where: { isDeleted: false },
            orderBy: { name: "asc" },
        });
        (0, response_1.successResponse)(res, "Categories retrieved successfully", categories);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to retrieve categories", 500, error.message);
    }
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma_1.default.category.findFirst({
            where: { id: id, isDeleted: false },
        });
        if (!category) {
            (0, response_1.errorResponse)(res, "Category not found", 404);
            return;
        }
        (0, response_1.successResponse)(res, "Category retrieved successfully", category);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to retrieve category", 500, error.message);
    }
};
exports.getCategoryById = getCategoryById;
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const existingCategory = await prisma_1.default.category.findFirst({
            where: { name: name, isDeleted: false },
        });
        if (existingCategory) {
            (0, response_1.errorResponse)(res, "Category already exists", 400);
            return;
        }
        const category = await prisma_1.default.category.create({
            data: { name: name, description },
        });
        (0, response_1.successResponse)(res, "Category created successfully", category, 201);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to create category", 500, error.message);
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const existingCategory = await prisma_1.default.category.findFirst({
            where: { id: id, isDeleted: false },
        });
        if (!existingCategory) {
            (0, response_1.errorResponse)(res, "Category not found", 404);
            return;
        }
        const category = await prisma_1.default.category.update({
            where: { id: id },
            data: {
                name: name || existingCategory.name,
                description: description !== undefined ? description : existingCategory.description,
            },
        });
        (0, response_1.successResponse)(res, "Category updated successfully", category);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to update category", 500, error.message);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const existingCategory = await prisma_1.default.category.findFirst({
            where: { id: id, isDeleted: false },
        });
        if (!existingCategory) {
            (0, response_1.errorResponse)(res, "Category not found", 404);
            return;
        }
        await prisma_1.default.category.update({
            where: { id: id },
            data: { isDeleted: true },
        });
        (0, response_1.successResponse)(res, "Category deleted successfully");
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to delete category", 500, error.message);
    }
};
exports.deleteCategory = deleteCategory;
