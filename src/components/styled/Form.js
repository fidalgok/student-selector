import styled from '@emotion/styled';
import ButtonBase from './Button';

export const Input = styled.input`
  padding: 1.2rem 4px 1.2rem 8px;
  border-radius: 5px;
  background-color: hsl(245, 15%, 90%);
  border: none;
  margin-bottom: 1.2rem;
  width: 24rem;
  border-bottom: 2px inset hsla(245, 85%, 70%, 0);
  font-size: inherit;
  &:focus {
    outline: none;
    background-color: hsl(245, 15%, 96%);
    border-bottom: 2px inset var(--color-secondary-5);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.4rem;
  background: var(--color-white);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  padding: 4.8rem 2.4rem;
`;

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 32rem 32rem;
  background: var(--color-neutral-2);
  min-height: 100vh;
  align-content:center;
  justify-content: center;
  margin: auto;
`;

export const Title = styled.p`
  font-size: 2.8rem;
  font-weight: 800;
  margin: 0;
  margin-bottom: 2.4rem;
  text-align: center;
  &.color-light {
    color: var(--color-white);
  }

  &.color-dark {
    color: var(--color-neutral-10);
  }
`;

export const Button = styled(ButtonBase)`
  color: var(--color-secondary-10);
  background-color: var(--color-secondary-5);
  border: none;
  border-radius: 5px;
  padding: 1.2rem 2.4rem;

  &.invert-color {
    color: var(--color-secondary-1);
    background: none;
    border: 2px solid var(--color-secondary-1);
    align-self:center;
  }
`;