import { google } from 'googleapis';

export const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'http://localhost:3000/api/auth/google/callback');
