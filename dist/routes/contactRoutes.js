"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Exposes sub-routes of /contacts/
const express_1 = require("express");
const contactsController_1 = __importDefault(require("../controllers/contactsController"));
const contactsRouter = (0, express_1.Router)();
const contactsController = new contactsController_1.default();
contactsRouter.get('/', (req, res, next) => {
    console.log('inside router');
    res.send('contacts');
    next();
}, contactsController.get);
exports.default = contactsRouter;
//# sourceMappingURL=contactRoutes.js.map