import { db } from '@/db';
import { errorHandler } from '@/lib/errors/handler';
import { CreateProductValidator } from '@/lib/validators/product';
import { searchParamsSchema } from '@/lib/validators/searchParams';
import { CreateUserValidator } from '@/lib/validators/user';

export async function GET(req: Request) {
  try {
    const searchParams = Object.fromEntries(new URL(req.url).searchParams.entries());
    const { take, skip, search } = searchParamsSchema.parse(searchParams);

    const users = await db.product.findMany({
      where: {
        deletedAt: null,
        OR: [{ name: { contains: search } }, { description: { contains: search } }],
      },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
    });

    return Response.json({ code: 200, message: 'Product data retrieved successfully', data: users });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsedBody = CreateProductValidator.parse(body);
    const createdProduct = await db.product.create({
      data: parsedBody,
    });

    return Response.json({ code: 201, message: 'Product created successfully', data: createdProduct }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
