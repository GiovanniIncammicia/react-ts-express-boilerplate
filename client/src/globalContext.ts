import { createContext, useContext, Dispatch } from 'react';
export const initialState = {
  loading: false,
  user: null,
};

type Action = {
  type: 'startLoading' | 'stopLoading' | 'setUser',
  data?: any,
};

type State = {
  loading: boolean,
  user: any
};

type Context = {
  state: State,
  dispatch: Dispatch<any>
}

const GlobalContext = createContext<Context>({ state: initialState, dispatch: () => null });
export const Provider = GlobalContext.Provider;

export const reducer = (state: State, action: Action) : State => {
  switch(action.type) {
    case 'startLoading': return { ...state, loading: true };
    case 'stopLoading': return { ...state, loading: false };
    case 'setUser': return { ...state, user: action.data };
    default: return state;
  }
}

export const useGlobalContext = (): [State, Dispatch<any>] => {
  const { state, dispatch } = useContext(GlobalContext);
  return [state, dispatch];
}