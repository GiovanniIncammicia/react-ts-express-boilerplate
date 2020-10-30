import { TTodo } from "./reducer";
import { post, put, del, get } from "../../utility/Fetch";

export const createTodo = (body: TTodo) => post('todos/', body);
export const updateTodo = (body: TTodo) => put(`todos/${body._id}`, body); // TODO: never used
export const deleteTodo = (id: string) => del(`todos/${id}`);
export const listTodos = (uid: string) => get(`todos/${uid}`);
