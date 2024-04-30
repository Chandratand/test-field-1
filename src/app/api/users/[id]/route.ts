import { db } from '@/db';
import { NotFoundError, UnauthorizedError } from '@/lib/errors';
import { errorHandler } from '@/lib/errors/handler';
import { verifyAuth } from '@/lib/jwt';
import { EditUserValidator } from '@/lib/validators/user';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    verifyAuth();
    const { id } = params;
    if (!Number(id)) throw new NotFoundError('User not found');

    const user = await db.user.findUnique({
      where: {
        id: Number(id),
        deletedAt: null,
      },
    });

    if (!user) throw new NotFoundError('User not found');
    return Response.json({ code: 200, message: 'User details retrieved successfully.', data: user });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const auth = verifyAuth();
    if (auth?.role !== 'Admin') throw new UnauthorizedError('Unauthorized');
    const { id } = params;
    if (!Number(id)) throw new NotFoundError('User not found');

    const body = await req.json();
    const parsedBody = EditUserValidator.parse(body);

    const updatedUser = await db.user.update({
      where: {
        id: Number(id),
        deletedAt: null,
      },
      data: parsedBody,
    });
    return Response.json({ code: 200, message: 'User updated successfully.', data: updatedUser });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const auth = verifyAuth();
    if (auth?.role !== 'Admin') throw new UnauthorizedError('Unauthorized');
    const { id } = params;
    if (!Number(id)) throw new NotFoundError('User not found');

    const user = await db.user.delete({
      where: {
        id: Number(id),
        deletedAt: null,
      },
    });

    return Response.json({ code: 200, message: 'User deleted successfully.' });
  } catch (error) {
    return errorHandler(error);
  }
}
