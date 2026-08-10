"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrderStatus = exports.createOrder = exports.getOrderById = exports.getAllOrders = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const response_1 = require("../../lib/response");
const getAllOrders = async (req, res) => {
    try {
        const { userId, status } = req.query;
        const where = { isDeleted: false };
        if (userId)
            where.userId = userId;
        if (status)
            where.status = status;
        const orders = await prisma_1.default.order.findMany({
            where,
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
                orderItems: {
                    include: {
                        product: {
                            select: { id: true, name: true, price: true },
                        },
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        (0, response_1.successResponse)(res, "Orders retrieved successfully", orders);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to retrieve orders", 500, error.message);
    }
};
exports.getAllOrders = getAllOrders;
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await prisma_1.default.order.findFirst({
            where: { id: id, isDeleted: false },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
                orderItems: {
                    include: {
                        product: {
                            select: { id: true, name: true, price: true },
                        },
                    },
                },
            },
        });
        if (!order) {
            (0, response_1.errorResponse)(res, "Order not found", 404);
            return;
        }
        (0, response_1.successResponse)(res, "Order retrieved successfully", order);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to retrieve order", 500, error.message);
    }
};
exports.getOrderById = getOrderById;
const createOrder = async (req, res) => {
    try {
        const { items, status } = req.body;
        const user = req.user;
        if (!items || !Array.isArray(items) || items.length === 0) {
            (0, response_1.errorResponse)(res, "Order items are required", 400);
            return;
        }
        let totalAmount = 0;
        const orderItemsData = [];
        for (const item of items) {
            const product = await prisma_1.default.product.findFirst({
                where: { id: item.productId, isDeleted: false },
            });
            if (!product) {
                (0, response_1.errorResponse)(res, `Product ${item.productId} not found`, 404);
                return;
            }
            const itemPrice = product.price * item.quantity;
            totalAmount += itemPrice;
            orderItemsData.push({
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
            });
        }
        const order = await prisma_1.default.order.create({
            data: {
                totalAmount,
                status: status || "PENDING",
                userId: user.id,
                orderItems: {
                    create: orderItemsData,
                },
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
                orderItems: {
                    include: {
                        product: {
                            select: { id: true, name: true, price: true },
                        },
                    },
                },
            },
        });
        (0, response_1.successResponse)(res, "Order created successfully", order, 201);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to create order", 500, error.message);
    }
};
exports.createOrder = createOrder;
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const existingOrder = await prisma_1.default.order.findFirst({
            where: { id: id, isDeleted: false },
        });
        if (!existingOrder) {
            (0, response_1.errorResponse)(res, "Order not found", 404);
            return;
        }
        const order = await prisma_1.default.order.update({
            where: { id: id },
            data: { status: status },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
                orderItems: {
                    include: {
                        product: {
                            select: { id: true, name: true, price: true },
                        },
                    },
                },
            },
        });
        (0, response_1.successResponse)(res, "Order status updated successfully", order);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to update order status", 500, error.message);
    }
};
exports.updateOrderStatus = updateOrderStatus;
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const existingOrder = await prisma_1.default.order.findFirst({
            where: { id: id, isDeleted: false },
        });
        if (!existingOrder) {
            (0, response_1.errorResponse)(res, "Order not found", 404);
            return;
        }
        await prisma_1.default.order.update({
            where: { id: id },
            data: { isDeleted: true },
        });
        (0, response_1.successResponse)(res, "Order deleted successfully");
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to delete order", 500, error.message);
    }
};
exports.deleteOrder = deleteOrder;
