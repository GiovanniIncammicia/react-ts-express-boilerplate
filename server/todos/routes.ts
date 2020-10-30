// Router is responsible for listing all the available routes and which middlewares/controller's function should be called for each route
// Router is the dispatcher between the client and the middlewares/controller
import { Router } from 'express';
import { createTodo, updateTodo, deleteTodo, listTodos } from './controller';
import { checkBody, checkIfAuthenticated } from '../utility/middlewares';
const router = Router();

// Create Todo
router.post('/', [checkBody, createTodo]);

// Update Todo (Should be idempotent)
router.put('/:id', [checkBody, updateTodo]);

// Delete Todo
router.delete('/:id', [deleteTodo]);

// List Todos
router.get('/:uid', [checkIfAuthenticated, listTodos]);

export default router;
