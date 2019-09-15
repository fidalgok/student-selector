// Button Styles
import styled from '@emotion/styled';

export default styled.button`
  cursor: pointer;
  background: none;
  border: none;
  border-radius: 5px;
  padding: .8rem 1.6rem;
  font-size: inherit;
  color: inherit;
  font-weight: 800;
  transition: all .12s ease-in;

  @media (max-width: 520px){
    padding: 1rem .8rem;
  }

  &.primary {
    background: var(--color-secondary-5);
    color: var(--color-secondary-10);
    &:hover{
      background: var(--color-secondary-4);
      box-shadow: var(--color-primary-box-shadow);
    }
  }

  &.secondary {
    color: var(--color-neutral-8);
    &:hover{

      box-shadow: 0px 4px 8px hsla(44, 12%, 33%, .14);
    }
  }

  &.danger{
    color: var(--color-neutral-8);

    &:hover {
      color: var(--color-red-8);
      box-shadow: 0px 4px 8px hsla(355, 92%, 33%, .14);

    }
  }
`;