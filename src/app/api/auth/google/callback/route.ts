import { db } from '@/db';
import { oauth2Client } from '@/lib/google';
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

// SHOULD NEVER BE HARDCODED
const secret = 'Mgtt2JZ6kT';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const { tokens } = await oauth2Client.getToken(code as string);

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });

    const { data } = await oauth2.userinfo.get();

    if (!data.email || !data.name) {
      return Response.json({ data: data });
    }

    let user = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          name: data.name,
          email: data.email,
          role: 'User',
        },
      });
    }

    const payload = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
    };

    const expiresIn = 60 * 60 * 1;
    const token = jwt.sign(payload, secret, { expiresIn: expiresIn });

    return Response.json({ data: data, token });
  } catch (error: any) {
    return Response.json({ data: error?.message });
  }
}
