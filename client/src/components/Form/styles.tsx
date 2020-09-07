import styled from 'styled-components';
import { Flex } from '../Lib';

export const FormStyled = styled.form`
  margin: 20rem auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vw;
  input {
    margin-top: 15rem;
    width: 100%;
  }
  span {
    color: var(--red);
    ::before {
      display: inline;
      content: "⚠ ";
    }
  }
`;

export const FormButtons = styled(Flex)`
  margin-top: 30rem;
  flex-direction: column;
  input {
    width: auto;
    margin: 0;
    cursor: pointer;
  }
  button, input {
    height: 40rem;
    border-radius: 5rem;
    padding: 0 25rem;
    margin-bottom: 20rem;
    border: 1rem solid var(--border-gray);
    background-color: var(--white);
    :hover {
      background-color: var(--background-gray);
    }
  }
  button:last-child {
    background-color: var(--main);
    color: var(--white);
    :hover {
      background-color: var(--main-light);
      color: var(--text)
    }
  }
`;