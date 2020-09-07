import styled from 'styled-components';
import { Flex } from '../Lib';

export const TodoListContainer = styled(Flex)`
  flex-direction: column;
  width: 40vw;
  margin: 20rem auto 0;
  & > h1 { font-size: 20rem; }
`;

export const NewTodoContainer = styled(Flex)`
  & > svg {
    margin-left: 10rem;
    cursor: pointer;
    :hover { transform: scale(1.3) }
  }
`;

export const TodoElementsContainer = styled.div`
  & > div {
    margin-top: 10rem;
    svg {
      margin-left: 10rem;
      opacity: 0;
      cursor: pointer;
      :hover { color: var(--red); }
    }
    :hover { svg { opacity: 1 } }
  }
`;

export const TodoElement = styled.div<{ selected: boolean }>`
  padding: 5rem 15rem;
  border-radius: 5rem;
  text-align: center;
  border: 1.3rem solid transparent;
  cursor: pointer;
  ${({ selected }) => selected && `background-color: var(--main-superlight);`}
  :hover { border: 1.3rem solid var(--main-superlight); }
`;