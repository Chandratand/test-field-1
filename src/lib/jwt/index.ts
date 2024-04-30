import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';
import { UnauthenticatedError } from '../errors';

// SHOULD NEVER BE HARDCODED
const secret = 'Mgtt2JZ6kT';
export const verifyAuth = () => {
  const headersList = headers();
  const authorization = headersList.get('Authorization');

  if (!authorization) {
    throw new UnauthenticatedError('Unauthenticated');
  }
  const token = authorization.split(' ')[1];

  try {
    const jwtDecode = jwt.verify(token, secret);
    if (typeof jwtDecode !== 'string') {
      return jwtDecode;
    }
  } catch (error) {
    throw new UnauthenticatedError('Unauthenticated');
  }
};
