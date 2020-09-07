import React, { useReducer, useMemo, useEffect } from 'react';
import TodoList from './components/TodoList';
import Header from './components/Header';
import Form from './components/Form';
import { reducer, initialState, Provider } from './globalContext';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { Flex } from './components/Lib';
import { Loading } from './Icons';
import Signup from './components/Auth/Signup';
import PasswordReset from './components/Auth/PasswordReset';
import Signin from './components/Auth/Signin';
import { auth, generateUserDocument } from './firebase';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, loading } = state;
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      const data = await generateUserDocument(user);
      dispatch({ type: 'setUser', data });
    });
  }, []);

  return !user
  ? <NonLoggedRouter />
  : (
    <Provider value={contextValue}>
      { loading && <Overlay /> }
      <Header />
      <LoggedRouter />      
    </Provider>
  );
}

const Overlay = styled((props: any) => <Flex {...props}><Loading spin size="5x" /></Flex>)`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  opacity: 0.8;
  z-index: 100;
  color: var(--white);
  svg { animation: fa-spin 1s infinite linear; }
`;

const LoggedRouter = () => (
  <Switch>
    <Route path="/todolist"><TodoList /></Route>
    <Route path="/form"><Form /></Route>
    <Route path="/">Home</Route>
  </Switch>
);

const NonLoggedRouter = () => (
  <Switch>
    <Route path="/signup"><Signup /></Route>
    <Route path="/password-reset"><PasswordReset /></Route>
    <Route path="/"><Signin /></Route>
  </Switch>
);