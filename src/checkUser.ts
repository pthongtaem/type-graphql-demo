import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenInterface } from './types/TokenInterface';
import { RequestWithUser } from './types/RequestWithUser';

export const checkUser = async (
  req: RequestWithUser,
  _: Response,
  next: NextFunction,
) => {
  const token = req.headers['x-token'];

  try {
    const decoded = jwt.verify(token as string, 'XXXXX');
    const { userId } = decoded as TokenInterface;

    console.log(userId);

    req.user = { id: userId };
  } catch (e) {
    console.error(e);
  }
  next();
};
