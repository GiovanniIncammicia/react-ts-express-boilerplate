import { TTodo } from "./reducer";
import { create, update, remove, get } from "../../utility/Fetch";

export const createTodo = (body: TTodo) => create('todos/', body);
export const updateTodo = (body: TTodo) => update(`todos/${body._id}`, body); // TODO: never used
export const deleteTodo = (id: string) => remove(`todos/${id}`);
export const listTodos = (uid: string) => get(`todos/${uid}`);
