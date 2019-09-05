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

  &.primary {
    background: var(--color-secondary-5);
    color: var(--color-secondary-10);

  }

  &.secondary {

    color: var(--color-neutral-8);
  }

  &.danger{
    color: var(--color-neutral-8);

    &:hover {
      color: var(--color-red-8);
    }
  }
`;