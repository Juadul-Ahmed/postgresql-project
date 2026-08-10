"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = global.prisma || new client_1.PrismaClient();
if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}
prisma.$connect().catch((err) => {
    console.error("Prisma connection error:", err);
});
exports.default = prisma;
