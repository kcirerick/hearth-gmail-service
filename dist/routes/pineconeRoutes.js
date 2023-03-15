"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Exposes sub-routes of /pinecone/
const express_1 = require("express");
const pineconeController_1 = __importDefault(require("../controllers/pineconeController"));
const pineconeRouter = (0, express_1.Router)();
const pineconeController = new pineconeController_1.default();
pineconeRouter.get('/', pineconeController.get);
exports.default = pineconeRouter;
//# sourceMappingURL=pineconeRoutes.js.map