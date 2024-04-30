import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { BadRequestError, NotFoundError, UnauthenticatedError, UnauthorizedError } from '.';

type HandledError = Error | ZodError | Prisma.PrismaClientKnownRequestError | any;

export const errorHandler = (error: HandledError) => {
  let response: { code: number; message: string; error?: any };

  switch (true) {
    case error instanceof ZodError:
      response = { code: 400, message: 'Bad request', error: error.errors };
      break;
    case error instanceof Prisma.PrismaClientKnownRequestError:
      response = handlePrismaError(error);
      break;
    case error instanceof NotFoundError:
    case error instanceof BadRequestError:
    case error instanceof UnauthenticatedError:
    case error instanceof UnauthorizedError:
      response = { code: error.statusCode, message: error.message };
      break;
    default:
      response = { code: 500, message: error?.message || 'Internal Server Error' };
      break;
  }

  return Response.json(response, { status: response.code });
};

const handlePrismaError = (error: Prisma.PrismaClientKnownRequestError): { code: number; message: string } => {
  let errorMessage: string;
  let errorCode = 400;

  switch (error.code) {
    case 'P2002':
      errorMessage = `Duplicate field value: ${error.meta?.target}`;
      break;
    case 'P2014':
      errorMessage = `Invalid ID: ${error.meta?.target}`;
      break;
    case 'P2003':
      errorMessage = `Invalid input data: ${error.meta?.target}`;
      break;
    case 'P2025':
      errorMessage = `${error.meta?.modelName || 'Record'} not found.`;
      errorCode = 404;
      break;
    default:
      errorMessage = `Something went wrong: ${error.meta?.target}`;
      errorCode = 500;
      break;
  }

  return { code: errorCode, message: errorMessage };
};
