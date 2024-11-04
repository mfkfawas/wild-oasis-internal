import styled, { css } from 'styled-components';

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;

  ${props =>
    props.error &&
    css`
      outline: 2px solid var(--color-red-500);
      outline-offset: -1px;
    `}
`;

export default Input;
