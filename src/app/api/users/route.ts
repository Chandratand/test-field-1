import { db } from '@/db';
import { errorHandler } from '@/lib/errors/handler';
import { searchParamsSchema } from '@/lib/validators/searchParams';
import { CreateUserValidator } from '@/lib/validators/user';

export async function GET(req: Request) {
  try {
    const searchParams = Object.fromEntries(new URL(req.url).searchParams.entries());
    const { take, skip, search } = searchParamsSchema.parse(searchParams);

    const users = await db.user.findMany({
      where: {
        deletedAt: null,
        OR: [{ name: { contains: search } }, { email: { contains: search } }, { address: { contains: search } }],
      },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
    });

    return Response.json({ code: 200, message: 'User data retrieved successfully', data: users });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsedBody = CreateUserValidator.parse(body);
    const createdUser = await db.user.create({
      data: parsedBody,
    });

    return Response.json({ code: 201, message: 'User created successfully', data: createdUser }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
