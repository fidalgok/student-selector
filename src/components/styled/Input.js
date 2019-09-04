import styled from '@emotion/styled';

export default styled.input`
  padding: 1rem 4px;
  border-radius: 5px;
  background-color: hsl(245, 15%, 90%);
  border: none;
  margin-bottom: 1.2rem;
  width: 24rem;
  border-bottom: 2px inset hsla(245, 85%, 70%, 0);
  &:focus {
    outline: none;
    border-bottom: 2px inset hsl(245, 85%, 70%);
  }
`;