"use strict";
// import { google } from 'googleapis';
// import { OAuth2Client } from 'google-auth-library';
// import express, { Request, Response, NextFunction } from 'express';
//
// const client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
//
// const app = express();
//
// app.get('/auth/google', (req: Request, res: Response) => {
//   const authUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: [] // TODO
//   });
//   res.redirect(authUrl);
// });
//
// app.get('/auth/google/callback', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { code } = req.query;
//     const { tokens } = await oauth2Client.getToken(code as string);
//     // Use the access token to make API requests
//     oauth2Client.setCredentials(tokens);
//     // Redirect the user to the contacts page
//     res.redirect('/contacts');
//   } catch (error) {
//     next(error);
//   }
// });
//
// app.get('/auth/google/revoke', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const tokens = oauth2Client.credentials;
//     if (tokens) {
//       await oauth2Client.revokeToken(tokens.access_token);
//       res.send('User logged out');
//     } else {
//       res.send('No user is logged in');
//     }
//   } catch (error) {
//     next(error);
//   }
// });
//
// // const {OAuth2Client} = require('google-auth-library');
// //
// // const SCOPES = [];
// //
// // const authorizeUrl = client.generateAuthUrl({
// //   access_type: 'offline',
// //   scope: SCOPES,
// // });
// //
// // const code = 'authorization_code_from_user';
// //
// // const {tokens} = await client.getToken(code);
//# sourceMappingURL=authController.js.map