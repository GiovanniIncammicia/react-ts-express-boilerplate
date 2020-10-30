// DAO (Data Access Object) is responsible for all the database related operations
// DAO is the link between the server and the database
import { Schema, Document, model } from 'mongoose';
import { CustomError } from '../utility/errorLogger';
import { NOT_FOUND } from '../utility/httpStatusCodes';

export interface ITodo extends Document {
	user: string,
	text: string
};

const TodoSchema = new Schema({
	user: { type: String, required: true },
	text: { type: String, required: true }
}, { timestamps: true });

const Todo = model<ITodo>('Todo', TodoSchema);

export async function createTodo(todo: ITodo) {
	const newTodo = new Todo(todo);
	return newTodo.save();
}
export async function updateTodo(_id: string, todo: ITodo) {
	let newTodo = await Todo.findById(_id);
	if (!newTodo) throw new CustomError('Todo not found', NOT_FOUND);
	Object.assign(newTodo, todo);
	return newTodo.save();
}
export async function deleteTodo(id: string) {
	await Todo.findByIdAndDelete(id);
	return { ok: true };
}
export async function listTodos(user: string) {
	return Todo.find({ user }).lean().exec();
}