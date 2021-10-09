import * as React from 'react';
// libs
import styled from 'styled-components';
// types
import Loader from '@md-shared/components/content-loader/components/loader';

interface Props {
  isLoading: boolean;
}

const Wrapper = styled.div`
  ${({ theme }) => theme.templates.absolute};
  ${({ theme }) => theme.templates.centerContent};
`;

const ContentLoader: React.FC<Props> = ({ children, isLoading }) => {
  if (isLoading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  return <>{children}</>;
};

export { ContentLoader };
