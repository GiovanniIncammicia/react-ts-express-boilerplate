// Middlewares is responsible for all preliminary manipulations, as well as populating body with custom variables
import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from './common';
import admin from './firebase/service';
import { isEmptyObj } from './functions';
import { BAD_REQUEST, UNAUTHORIZED } from './httpStatusCodes';

export async function checkBody(req: Request, res: Response, next: NextFunction) {
  if (!isEmptyObj(req.body)) next();
  else return res.status(BAD_REQUEST).json({ error: 'Empty body' });
}

const getAuthToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (authorization && authorization.split(' ')[0] === 'Bearer')
    req.authToken = authorization.split(' ')[1];
  else req.authToken = null;
  next();
};

export const checkIfAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  getAuthToken(req as RequestWithUser, res, async () => {
    try {
      const { authToken } = req as RequestWithUser;
      const { name, email, uid } = await admin.auth().verifyIdToken(authToken as string);
      (req as RequestWithUser).user = { name, email, uid };
      return next();
    } catch (e) {
      return res.status(UNAUTHORIZED).json({ error: 'You are not authorized to make this request' });
    }
  });
};

export const checkIfAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userQuery = await admin.firestore().doc(`users/${(req as RequestWithUser).user.uid}`).get();
    const user = userQuery?.data();
    if (user?.isAdmin) next();
    else throw new Error();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ error: 'You are not authorized to make this request' });
  }
}