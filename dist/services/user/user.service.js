"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const response_1 = require("../../lib/response");
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma_1.default.user.findMany({
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
        (0, response_1.successResponse)(res, "Users retrieved successfully", users);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to retrieve users", 500, error.message);
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma_1.default.user.findFirst({
            where: { id: id, isDeleted: false },
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
            (0, response_1.errorResponse)(res, "User not found", 404);
            return;
        }
        (0, response_1.successResponse)(res, "User retrieved successfully", user);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to retrieve user", 500, error.message);
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;
        const existingUser = await prisma_1.default.user.findFirst({
            where: { id: id, isDeleted: false },
        });
        if (!existingUser) {
            (0, response_1.errorResponse)(res, "User not found", 404);
            return;
        }
        const user = await prisma_1.default.user.update({
            where: { id: id },
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
        (0, response_1.successResponse)(res, "User updated successfully", user);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to update user", 500, error.message);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const existingUser = await prisma_1.default.user.findFirst({
            where: { id: id, isDeleted: false },
        });
        if (!existingUser) {
            (0, response_1.errorResponse)(res, "User not found", 404);
            return;
        }
        await prisma_1.default.user.update({
            where: { id: id },
            data: { isDeleted: true },
        });
        (0, response_1.successResponse)(res, "User deleted successfully");
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to delete user", 500, error.message);
    }
};
exports.deleteUser = deleteUser;
