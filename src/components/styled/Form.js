import styled from '@emotion/styled';
import ButtonBase from './Button';

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 32rem 32rem;
  align-content:center;
  justify-content: center;
  margin: auto;
  @media (max-width: 650px){
    grid-template-columns: 32rem;
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
  @media (max-width: 650px){
    border-bottom-left-radius: 0px;
    border-top-right-radius: 15px;
  }
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

export const Label = styled.label`
  margin-bottom: 4px;
  font-size: 1.4rem;
  color: var(--color-neutral-8);
  display: block;
  align-self: flex-start;
`;

export const Input = styled.input`
   padding: 1rem 8px;
  border-radius: 5px;
  background-color: var(--color-neutral-2);
  border: none;
  margin-bottom: 2.4rem;
  width: 100%;
  border-bottom: 2px inset hsla(0, 0%, 0%, 0);
  font-size: inherit;
  color: inherit;
  &:focus {
    outline: none;
    border-bottom: 2px inset var(--color-secondary-5);
    background-color: var(--color-neutral-1);
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

  &.secondary {
    background: none;
    &:hover{
      box-shadow: none;
      text-decoration: underline;
    }
  }
`;