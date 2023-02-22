// Exposes sub-routes of /auth/google/
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import express, { Request, Response, NextFunction } from 'express';
import { client } from './authRoutes';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  console.log("Here are the credentials: ");
  client.getAccessToken()
    .then(token => console.log(token.access_token))
    .catch(err => console.error(err));
});

export default router;