import * as React from 'react';
import styled from 'styled-components';
import { ApolloError } from '@apollo/client';

interface Props {
  message: string | Error | ApolloError;
}

const Wrapper = styled.div`
  min-height: 300px;
  font-size: 24px;

  background-color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.templates.centerContent};
`;

const ErrorWrapper: React.FC<Props> = ({ message }) => {
  return <Wrapper>{message}</Wrapper>;
};

export { ErrorWrapper };
