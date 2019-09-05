import styled from '@emotion/styled';

export default styled.input`
  padding: 1rem 8px;
  border-radius: 5px;
  background-color: var(--color-neutral-2);
  border: none;
  margin-bottom: 1.2rem;
  width: 24rem;
  border-bottom: 2px inset hsla(0, 0%, 0%, 0);
  font-size: inherit;
  color: inherit;
  &:focus {
    outline: none;
    border-bottom: 2px inset var(--color-secondary-5);
    background-color: var(--color-neutral-1);
  }
`;