import React, { useReducer, ChangeEvent, useEffect } from 'react';
import { reducer, initialState, TTodo } from './reducer';
import { TodoElement, TodoListContainer, NewTodoContainer, TodoElementsContainer } from './styles';
import { HR, Input, Flex } from '../Lib';
import { Plus, Trash } from '../Icons';
import { deleteTodo, createTodo, listTodos } from './api';
import { useServerTransition } from '../../utility/hooks';
import { useGlobalContext } from '../../globalContext';

export default function TodoList () {
  const [{ todos, newTodo, selected }, dispatch] = useReducer(reducer, initialState);
  const [{ user }] = useGlobalContext();
  const performServerTransition = useServerTransition();
  const onNewTodoChange = (e: ChangeEvent<HTMLInputElement>) => dispatch({ type: 'changeNewTodo', value: e.target.value});
  const onTodoClick = (index: number) => dispatch({ type: 'select', index });
  
  const onTodoDelete = (index: number) => performServerTransition(() => deleteTodo(todos[index]._id), () => dispatch({ type: 'delete', index }));
  const onTodoCreate = () => performServerTransition(() => createTodo({ user: user.uid, _id: `${Date.now()}`, text: newTodo }), (data: TTodo) => dispatch({ type: 'create', data }));

  useEffect(() => { performServerTransition(() => listTodos(user.uid), (data: TTodo[]) => dispatch({ type: 'load', data })) }, [performServerTransition, user.uid]);

  return (
    <TodoListContainer>
      <h1>TODO LIST</h1>
      <HR />
      <NewTodoContainer>
        <Input value={newTodo} onChange={onNewTodoChange} />
        <Plus onClick={onTodoCreate} />
      </NewTodoContainer>
      <TodoElementsContainer>
        { todos.map((t: TTodo, i) => (
          <Flex key={t._id}>
            <TodoElement selected={selected === i} onClick={() => onTodoClick(i)}>
              {t.text}
            </TodoElement>
            <Trash onClick={() => onTodoDelete(i)} />
          </Flex>
        ))}
      </TodoElementsContainer>
    </TodoListContainer>
  );
}