// Exposes sub-routes of /auth/google/
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import express, { Request, Response, NextFunction } from 'express';

const client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: [
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/contacts.readonly'
    ]
  });
  res.redirect(authUrl);
});

router.get('/callback', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.query;
    const { tokens } = await client.getToken(code as string);
    // Use the access token to make API requests
    client.setCredentials(tokens);
    // Redirect the user to the contacts page
    res.redirect('/contacts'); // TODO implement contacts
  } catch (error) {
    next(error);
  }
});

router.get('/revoke', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokens = client.credentials;
    if (tokens.access_token) {
      await client.revokeToken(tokens.access_token);
      res.send('User logged out');
    } else {
      res.send('No user is logged in');
    }
  } catch (error) {
    next(error);
  }
});

export default router;
export { client };