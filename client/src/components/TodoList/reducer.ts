export type TTodo = {
  readonly _id: string,
  user: string,
	text: string
};

export const initialState = {
  todos: [],
  selected: 0,
  newTodo: ''
};

type Action = {
  type: 'select' | 'load' | 'changeNewTodo' | 'delete' | 'create',
  index?: number,
  value?: string,
  data?: TTodo | TTodo[]
};

type State = {
  todos: TTodo[],
  selected: number,
  newTodo: string
};

const todosReducer = (todos: TTodo[], action: Action) => {
  const { index, data, type } = action;
  
  switch (type) {
    case 'delete': return todos.filter((_, i) => i !== index );
    case 'create': return [data as TTodo, ...todos];
    default: return todos;
  }
}

export const reducer = (state: State, action: Action) : State => {
  const { type, index, value, data } = action;
  const { selected, todos } = state;
  const afterDeleteIndex = () => selected < (index as number) ? selected : Math.max(Math.min((selected - 1), todos.length), 0);

  switch(type) {
    case 'select':
      return { ...state, selected: (index as number) };
    case 'load':
      return { ...state, todos: data as TTodo[] };
    case 'changeNewTodo':
      return { ...state, newTodo: value as string };
    case 'delete':
      return { ...state, todos: todosReducer(todos, action), selected: afterDeleteIndex() };
    case 'create':
      return { ...state, todos: todosReducer(todos, action), selected: 0, newTodo: '' };
    default: return state;
  }
}