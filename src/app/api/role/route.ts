import { db } from '@/db';
import { errorHandler } from '@/lib/errors/handler';
import { verifyAuth } from '@/lib/jwt';

export async function GET(req: Request) {
  try {
    const user = verifyAuth();

    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        role: user?.role === 'User' ? 'Admin' : 'User',
      },
    });

    return Response.json({ code: 200, message: 'Role updated successfully.', user }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
