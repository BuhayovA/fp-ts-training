import * as React from 'react';
// libs
import styled from 'styled-components';
import { ApolloError } from '@apollo/client';
// components
import { ErrorWrapper } from '@md-shared/components/errors/content';
import Loader from '@md-shared/components/content-loader/components/loader';

interface Props {
  isLoading: boolean;
  error?: string | Error | ApolloError;
}

const Wrapper = styled.div`
  ${({ theme }) => theme.templates.absolute};
  ${({ theme }) => theme.templates.centerContent};
`;

const ContentLoader: React.FC<Props> = ({ children, error, isLoading }) => {
  if (isLoading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  if (error) {
    return <ErrorWrapper message={error} />;
  }

  return <>{children}</>;
};

export { ContentLoader };
