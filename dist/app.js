"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const errorHandler_1 = require("./lib/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/categories", category_routes_1.default);
app.use("/api/products", product_routes_1.default);
app.use("/api/reviews", review_routes_1.default);
app.use("/api/orders", order_routes_1.default);
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API", version: "1.0.0" });
});
app.get("/debug", async (req, res) => {
    try {
        const prisma = (await Promise.resolve().then(() => __importStar(require("./lib/prisma")))).default;
        res.json({ success: true, message: "Prisma loaded", data: { initialized: true } });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Prisma error", error: error.message, stack: error.stack });
    }
});
app.use(errorHandler_1.errorHandler);
exports.default = app;
