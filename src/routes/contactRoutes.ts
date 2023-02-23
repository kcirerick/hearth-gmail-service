// Exposes sub-routes of /contacts/
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import express, { Request, Response, NextFunction } from 'express';
import { client } from './authRoutes';

const maxResults = 100;
const maxMessages = maxResults  * 10; // Retrieve more messages than the desired unique emails to increase chances of getting maxResults unique contacts.
const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const gmail = google.gmail({ version: 'v1', auth: client });
    const messages = await gmail.users.messages.list({userId: 'me', maxResults: maxMessages});
    // Optional chaining '?.' checks that values are non-null before executing
    const messageIds = messages?.data?.messages?.map(message => message.id) || [];

    // Retrieve message details
    const messageDetails = await Promise.all(
      messageIds.slice(0, maxResults).map(async messageId => { // Returns at most maxResults unique emails.
        if (messageId) {
          const message = await gmail.users.messages.get({ userId: 'me', id: messageId, format: 'full'});
          const headers = message?.data?.payload?.headers || [];
          const fromHeader = headers.find(header => (header['name'] === 'From'));
          if(typeof fromHeader !== 'undefined') {
            const from = fromHeader['value'];
            return { from };
          } else {
            console.log('No messages with From header found');
          }
        } else {
          console.log('Message ID is undefined or null');
        }
    }));

    // Extract unique email addresses from the message details
    const contacts = Array.from(new Set(messageDetails?.map(messageDetails => messageDetails?.from)));

    // Render contacts page
    res.render('contacts', { contacts });
  } catch (error) {
    next(error);
  }
});

export default router;