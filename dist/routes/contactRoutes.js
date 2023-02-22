"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = require("./authRoutes");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    console.log("Here are the credentials: ");
    authRoutes_1.client.getAccessToken()
        .then(token => console.log(token.access_token))
        .catch(err => console.error(err));
});
exports.default = router;
//# sourceMappingURL=contactRoutes.js.map