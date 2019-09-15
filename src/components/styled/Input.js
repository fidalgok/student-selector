import React from 'react';
import styled from '@emotion/styled';

const Input = styled.input`
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

const InputContainer = styled(Input)`
  display: inline-block;
  padding: 0 1rem;
  width: auto;

  &:focus-within {
    border-bottom: 2px solid var(--color-secondary-5);
    background: var(--color-neutral-1);
  }

  @media (max-width: 520px){
    padding: 0 0 0 4px;
  }

  input{
    border: none;
    appearance: none;
    background: none;
    font-size: inherit;
    color: inherit;
    margin-right: 1.2rem;

    &:focus{
      outline: none;
    }

    @media (max-width: 520px){
      margin-right: 0px;
    }
  }
`;

function InputDiv(props) {
  return <InputContainer as='div'>{props.children}</InputContainer>
}

export { Input as default, InputDiv };