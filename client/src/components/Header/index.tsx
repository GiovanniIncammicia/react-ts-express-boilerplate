import React, { memo, ReactNode } from 'react';
import { HeaderStyled, Logo, Menu, Icons } from './styles';
import { Flex } from '../Lib';
import { Link } from 'react-router-dom';
import { auth } from '../../config/firebase';

export default memo(function Header ({ children }: { children?: ReactNode }) {
  return (
    <HeaderStyled>
      <Logo to="/">
        <span role="img" aria-label="Logo">⚛️</span>
        <h1>React Boilerplate</h1>
      </Logo>
      {children}
      <Flex>
        <Menu>
          <Link to="/todolist">Todo List</Link>
          <Link to="/form">Form</Link>
          <Link to="/table">Table</Link>
        </Menu>
        <Icons>
          <button onClick={() => auth.signOut()}>Sign out</button>
        </Icons>
      </Flex>
    </HeaderStyled>
  );
});