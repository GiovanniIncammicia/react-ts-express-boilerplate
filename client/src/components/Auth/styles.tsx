import styled from 'styled-components';
import { Flex } from '../Lib';

export const AuthContainer = styled(Flex)`
  background-color: var(--white);
  width: 28vw;
  position: absolute;
  left: calc(50% - 12.5vw);
  top: 50%;
  transform: translateY(-50%);
  box-shadow: var(--shadow-1);
  border-radius: 10rem;
  flex-direction: column;
  padding: 20rem 28rem;
  & > div:first-child {
    margin-bottom: 20rem;
    span { font-size: 55rem; }
    h1 { font-size: 25rem; font-weight: 300; }
  }
  & > a {
    font-size: 14rem;
    margin-top: 20rem;
  }
  & > form {
    display: flex;
    flex-direction: column;
    width: 100%;
    a {
      font-size: 12rem;
      margin-left: auto;
      margin-top: 4rem;
    }
    input {
      height: 38rem;
      margin-top: 20rem;
    }
  }
`;

export const AuthMainButton = styled.button`
  border-radius: 30rem;
  background-color: var(--main);
  height: 48rem;
  margin-top: 30rem;
  width: 100%;
  color: var(--white);
`;

export const AuthGoogleButton = styled.button`
  border-radius: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 48rem;
  border: 1.5rem solid var(--border-gray);
  width: 100%;
  img { height: 20rem; }
  span { margin-right: 25rem; }
  :hover {
    background-color: var(--background-gray);
  }
`;

export const AuthOr = styled.fieldset`
  border: 0;
  padding: 0;
  border-radius: 0;
  margin: 9rem 0 25rem;
  border-top: 1.5rem solid var(--border-gray);
  legend {
    margin: 0 auto;
    padding: 0 12rem;
    text-align: center;
    font-size: 15rem;
    user-select: none;
  }
`;