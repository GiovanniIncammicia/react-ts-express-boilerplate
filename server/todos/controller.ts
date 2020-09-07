// Controllers are responsible for reading and manipulating the request, calling the daos and create and send the response
// They are the gate between the clients and the server
import { Request, Response, NextFunction} from 'express';
import * as dao from './dao';
import { OK } from '../utility/httpStatusCodes';
import { handleError } from '../utility/errorHandler';

export async function createTodo(req: Request, res: Response, next: NextFunction) {
  try {
    delete req.body._id;

    const todo = await dao.createTodo(req.body);
    res.status(OK).json(todo);
  } catch (error) { handleError(error, next, 'todos/createTodo') }
}

export async function updateTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const todo = await dao.updateTodo(req.params.id, req.body);
    res.status(OK).json(todo);
  } catch (error) { handleError(error, next, 'todos/updateTodo') }
}

export async function deleteTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await dao.deleteTodo(req.params.id);
    res.status(OK).json(result);
  } catch (error) { handleError(error, next, 'todos/deleteTodo') }
}

export async function listTodos(req: Request, res: Response, next: NextFunction) {
  try {
    const list = await dao.listTodos(req.params.uid);
    res.status(OK).json(list);
  } catch (error) { handleError(error, next, 'todos/listTodos') }
}