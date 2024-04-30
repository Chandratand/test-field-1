import { oauth2Client } from '@/lib/google';
import { redirect } from 'next/navigation';

const scopes = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'];

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true,
});

export async function GET(request: Request) {
  redirect(authorizationUrl);
}
