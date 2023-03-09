"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const google_auth_library_1 = require("google-auth-library");
const express_1 = __importDefault(require("express"));
const client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
exports.client = client;
const router = express_1.default.Router();
router.get('/', (req, res) => {
    console.log('inside auth get route', req.url, client);
    const authUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/gmail.readonly',
            'https://www.googleapis.com/auth/contacts.readonly'
        ]
    });
    res.redirect(authUrl);
});
router.get('/callback', async (req, res, next) => {
    try {
        const { code } = req.query;
        const { tokens } = await client.getToken(code);
        // Use the access token to make API requests
        client.setCredentials(tokens);
        // Redirect the user to the contacts page
        res.redirect('/contacts');
    }
    catch (error) {
        next(error);
    }
});
router.get('/revoke', async (req, res, next) => {
    try {
        const tokens = client.credentials;
        if (tokens.access_token) {
            await client.revokeToken(tokens.access_token);
            res.send('User logged out');
        }
        else {
            res.send('No user is logged in');
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=authRoutes.js.map