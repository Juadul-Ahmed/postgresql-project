"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const bcrypt_1 = require("../../lib/bcrypt");
const jwt_1 = require("../../lib/jwt");
const response_1 = require("../../lib/response");
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await prisma_1.default.user.findFirst({
            where: { email, isDeleted: false },
        });
        if (existingUser) {
            (0, response_1.errorResponse)(res, "User already exists with this email", 400);
            return;
        }
        const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
        const user = await prisma_1.default.user.create({
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
        const token = (0, jwt_1.generateToken)({ id: user.id, email: user.email, role: user.role });
        (0, response_1.successResponse)(res, "User registered successfully", { user, token }, 201);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Registration failed", 500, error.message);
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.default.user.findFirst({
            where: { email, isDeleted: false },
        });
        if (!user) {
            (0, response_1.errorResponse)(res, "Invalid email or password", 401);
            return;
        }
        const isPasswordValid = await (0, bcrypt_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            (0, response_1.errorResponse)(res, "Invalid email or password", 401);
            return;
        }
        const token = (0, jwt_1.generateToken)({ id: user.id, email: user.email, role: user.role });
        (0, response_1.successResponse)(res, "Login successful", {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Login failed", 500, error.message);
    }
};
exports.login = login;
const getProfile = async (req, res) => {
    try {
        const user = req.user;
        const userData = await prisma_1.default.user.findUnique({
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
        (0, response_1.successResponse)(res, "Profile retrieved successfully", userData);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to retrieve profile", 500, error.message);
    }
};
exports.getProfile = getProfile;
