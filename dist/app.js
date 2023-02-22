"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const express = require("express");
const app = express();
app.get('/', (req, res) => {
    res.send('Welcome to my app! /n To log-in, navigate to https://localhost:3000/auth/google/');
});
app.use('/auth/google', authRoutes_1.default);
app.use('/contacts', contactRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map