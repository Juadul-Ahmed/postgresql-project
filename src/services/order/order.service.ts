import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { successResponse, errorResponse } from "../../lib/response";

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, status } = req.query;

    const where: any = { isDeleted: false };

    if (userId) where.userId = userId as string;
    if (status) where.status = status as string;

    const orders = await prisma.order.findMany({
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

    successResponse(res, "Orders retrieved successfully", orders);
  } catch (error) {
    errorResponse(res, "Failed to retrieve orders", 500, (error as Error).message);
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: { id: id as string, isDeleted: false },
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
      errorResponse(res, "Order not found", 404);
      return;
    }

    successResponse(res, "Order retrieved successfully", order);
  } catch (error) {
    errorResponse(res, "Failed to retrieve order", 500, (error as Error).message);
  }
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items, status } = req.body;
    const user = (req as any).user;

    if (!items || !Array.isArray(items) || items.length === 0) {
      errorResponse(res, "Order items are required", 400);
      return;
    }

    let totalAmount = 0;
    const orderItemsData: any[] = [];

    for (const item of items) {
      const product = await prisma.product.findFirst({
        where: { id: item.productId as string, isDeleted: false },
      });

      if (!product) {
        errorResponse(res, `Product ${item.productId} not found`, 404);
        return;
      }

      const itemPrice = product.price * item.quantity;
      totalAmount += itemPrice;

      orderItemsData.push({
        productId: item.productId as string,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await prisma.order.create({
      data: {
        totalAmount,
        status: (status as "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED") || "PENDING",
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

    successResponse(res, "Order created successfully", order, 201);
  } catch (error) {
    errorResponse(res, "Failed to create order", 500, (error as Error).message);
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existingOrder = await prisma.order.findFirst({
      where: { id: id as string, isDeleted: false },
    });

    if (!existingOrder) {
      errorResponse(res, "Order not found", 404);
      return;
    }

    const order = await prisma.order.update({
      where: { id: id as string },
      data: { status: status as "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" },
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

    successResponse(res, "Order status updated successfully", order);
  } catch (error) {
    errorResponse(res, "Failed to update order status", 500, (error as Error).message);
  }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const existingOrder = await prisma.order.findFirst({
      where: { id: id as string, isDeleted: false },
    });

    if (!existingOrder) {
      errorResponse(res, "Order not found", 404);
      return;
    }

    await prisma.order.update({
      where: { id: id as string },
      data: { isDeleted: true },
    });

    successResponse(res, "Order deleted successfully");
  } catch (error) {
    errorResponse(res, "Failed to delete order", 500, (error as Error).message);
  }
};
