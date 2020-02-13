import { Request } from 'express';

export interface MyContext {
  req: Request;
  user?: {
    id: number;
  };
}
