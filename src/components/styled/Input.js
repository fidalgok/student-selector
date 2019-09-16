/* @jsx jsx */
import React from 'react';
import styled from '@emotion/styled/macro';
import { css } from '@emotion/core'

const InputBase = css`
  padding: 1rem 8px;
  border-radius: 5px;
  background-color: var(--color-neutral-2);
  border: none;
  margin-bottom: 1.2rem;
  border-bottom: 2px inset hsla(0, 0%, 0%, 0);
  font-size: inherit;
  color: inherit;
  &:focus {
    outline: none;
    border-bottom: 2px inset var(--color-secondary-5);
    background-color: var(--color-neutral-1);
  }
`;

const Input = styled.input`
 ${InputBase}
`;

const InputContainer = styled.div`
  ${InputBase}
  display: inline-block;
  padding: 0 0 0 1rem;
  width: 100%;

  &:focus-within {
    border-bottom: 2px solid var(--color-secondary-5);
    background: var(--color-neutral-1);
  }

  @media (max-width: 520px){
    padding: 0 0 0 4px;
  }
  label {
    color: var(--color-neutral-6);
  }
  input {
    border: none;
    background: none;
    font-size: inherit;
    color: inherit;
    padding: 1rem 8px;

    &:focus{
      outline: none;
    }

    @media (max-width: 520px){
      margin-right: 0px;
    }
  }


`;


export { Input as default, InputContainer as InputDiv };