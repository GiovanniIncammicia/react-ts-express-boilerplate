import styled from 'styled-components';

type TFlex = {
  flexDirection?: 'row' | 'column',
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  alignItems?: 'flex-start' | 'flex-end' | 'center',
  width?: string,
  height?: string,
  padding?: string,
  margin?: string,
  [key: string]: any
}

export const Flex = styled.div<TFlex>`
  display: flex;
  flex-direction: ${({ flexDirection = 'row' }) => flexDirection };
  justify-content: ${({ justifyContent = 'center' }) => justifyContent };
  align-items: ${({ alignItems = 'center' }) => alignItems };
  width: ${({ width }) => width ? width : 'auto'};
  height: ${({ height }) => height ? height : 'auto'};
  padding: ${({ padding }) => padding ? padding : '0'};
  margin: ${({ margin }) => margin ? margin : '0'};
`;

export const HR = styled.div`
  height: 1rem;
  background-color: var(--border-gray);
  width: 100%;
  margin: 10rem 0;
`;

type TInput = {
  width?: string,
  height?: string,
  [key: string]: any
}

export const Input = styled.input<TInput>`
  border: 1.3rem solid var(--border-gray);
  border-radius: 4rem;
  outline: none;
  background-color: var(--white);
  padding: 5rem 12rem;
  width: ${({ width }) => width ? width : 'auto'};
  height: ${({ height }) => height ? height : 'auto'};
  transition: border-color 0.4s ease;
  :focus {
    border-color: var(--main);
  }
  :disabled {
    background-color: var(--border-gray);
  }
`;