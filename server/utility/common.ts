import { Request } from 'express';

export interface IUser {
  name?: string,
  email?: string,
  uid: string
}

export interface RequestWithUser extends Request {
  user: IUser,
  authToken: string | null,
};