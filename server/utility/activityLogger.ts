import { Request, Response, NextFunction } from 'express';
import { Schema, Document, model } from 'mongoose';
import { RequestWithUser, IUser } from './common';

interface ILog extends Document {
	status: number
  path: string
  user: IUser
  body: object
  params: object,
  query: object
};

const User = {
  name: String,
  email: String,
  uid: { type: String, required: true }
}

const LogSchema = new Schema({
  status: Number,
  path: String,
  user: User,
  body: { type: Schema.Types.Mixed },
  params: { type: Schema.Types.Mixed },
  query: { type: Schema.Types.Mixed },
}, { timestamps: { createdAt: 'createdAt' } });

const Log = model<ILog>('Log', LogSchema);

// Logger Middleware called in app.ts
export const logActivities = (req: Request, res: Response, next: NextFunction) => {
  const { body, params, query, baseUrl, path, user } = (req as RequestWithUser);

  Log.create({
    status: res.statusCode,
    path: baseUrl + path,
    user,
    body,
    params,
    query,
  });
};

export async function listActivities() {
	return Log.find().lean().exec();
}