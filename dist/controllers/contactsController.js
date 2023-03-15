"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import pool from '../dbconfig/dbconnector';
const googleapis_1 = require("googleapis");
const authRoutes_1 = require("../routes/authRoutes");
const maxResults = 100;
const maxMessages = maxResults * 10; // Retrieve more messages than the desired unique emails to increase chances of getting maxResults unique contacts.
class ContactsController {
    async get(req, res, next) {
        var _a, _b;
        console.log('got into controller');
        try {
            const gmail = googleapis_1.google.gmail({ version: 'v1', auth: authRoutes_1.client });
            const messages = await gmail.users.messages.list({ userId: 'me', maxResults: maxMessages });
            // Optional chaining '?.' checks that values are non-null before executing
            const messageIds = ((_b = (_a = messages === null || messages === void 0 ? void 0 : messages.data) === null || _a === void 0 ? void 0 : _a.messages) === null || _b === void 0 ? void 0 : _b.map(message => message.id)) || [];
            // Retrieve message details
            const messageDetails = await Promise.all(messageIds.slice(0, maxResults).map(async (messageId) => {
                var _a, _b;
                if (messageId) {
                    const message = await gmail.users.messages.get({ userId: 'me', id: messageId, format: 'full' });
                    const headers = ((_b = (_a = message === null || message === void 0 ? void 0 : message.data) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.headers) || [];
                    const fromHeader = headers.find(header => (header['name'] === 'From'));
                    if (typeof fromHeader !== 'undefined') {
                        const from = fromHeader['value'];
                        return { from };
                    }
                    else {
                        console.log('No messages with From header found');
                    }
                }
                else {
                    console.log('Message ID is undefined or null');
                }
            }));
            // Extract unique email addresses from the message details
            const contacts = Array.from(new Set(messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.map(messageDetails => messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.from)));
            // Render contacts page
            res.render('contacts', { contacts });
        }
        catch (error) {
            res.send('Welcome to my app! On this page, you will find a list of contacts from whom you\'ve received an email, but first you must log-in. To log-in, navigate to http://localhost:3000/auth/google/');
        }
    }
}
exports.default = ContactsController;
// CODE FOR QUERYING THE DB WHEN THE TIME COMES
// get(req, res) {
//      try {
//        // Get connection lease from pool
//        const client = await pool.connect();
//
//        // Query the db ASYNC
//        const sql = "SELECT * FROM contacts";
//        const { rows } = await client.query(sql);
//        const contacts = rows;
//
//        // Release connection back to pool
//        client.release();
//
//        res.send(contacts);
//      } catch (error) {
//        res.status(400).send(error);
//      }
//    }
//# sourceMappingURL=contactsController.js.map