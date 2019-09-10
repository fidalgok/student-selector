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
    padding: .4rem .8rem;
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

      background: var(--color-neutral-2);
    }
  }

  &.danger{
    color: var(--color-neutral-8);

    &:hover {
      color: var(--color-red-8);
      background: var(--color-neutral-1);
    }
  }
`;