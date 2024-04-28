import { db } from '@/db';
import { NotFoundError } from '@/lib/errors';
import { errorHandler } from '@/lib/errors/handler';
import { EditProductValidator } from '@/lib/validators/product';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!Number(id)) throw new NotFoundError('Product not found');

    const user = await db.product.findUnique({
      where: {
        id: Number(id),
        deletedAt: null,
      },
    });

    if (!user) throw new NotFoundError('Product not found');
    return Response.json({ code: 200, message: 'Product details retrieved successfully.', data: user });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!Number(id)) throw new NotFoundError('Product not found');

    const body = await req.json();
    const parsedBody = EditProductValidator.parse(body);

    const updatedUser = await db.product.update({
      where: {
        id: Number(id),
        deletedAt: null,
      },
      data: parsedBody,
    });
    return Response.json({ code: 200, message: 'Product updated successfully.', data: updatedUser });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!Number(id)) throw new NotFoundError('Product not found');

    const user = await db.product.delete({
      where: {
        id: Number(id),
        deletedAt: null,
      },
    });

    return Response.json({ code: 200, message: 'Product deleted successfully.' });
  } catch (error) {
    return errorHandler(error);
  }
}
