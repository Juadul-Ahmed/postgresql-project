"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jwt_1 = require("../lib/jwt");
const prisma_1 = __importDefault(require("../lib/prisma"));
const authenticate = (req, res, next) => {
    try {
        const token = (req.headers.authorization || "").replace("Bearer ", "");
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Authentication required",
                error: "No token provided",
            });
            return;
        }
        const decoded = (0, jwt_1.verifyToken)(token);
        prisma_1.default.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true, role: true, isDeleted: true },
        }).then((user) => {
            if (!user || user.isDeleted) {
                res.status(401).json({
                    success: false,
                    message: "Invalid token or user not found",
                });
                return;
            }
            req.user = {
                id: user.id,
                email: user.email,
                role: user.role,
            };
            next();
        }).catch((error) => {
            res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
exports.authenticate = authenticate;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Authentication required",
            });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: "Insufficient permissions",
            });
            return;
        }
        next();
    };
};
exports.authorize = authorize;
