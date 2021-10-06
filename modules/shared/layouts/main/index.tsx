import * as React from 'react';
// components
import Header from '@md-shared/layouts/main/components/header';
// views
import { ContentWrapper, ScreenTitle, Wrapper } from './views';

interface Props {
  screenTitle?: string;
}

const MainLayout: React.FC<Props> = ({ children, screenTitle }) => {
  return (
    <Wrapper>
      <Header />

      <ContentWrapper>
        {screenTitle && <ScreenTitle>{screenTitle}</ScreenTitle>}
        {children}
      </ContentWrapper>
    </Wrapper>
  );
};

export { MainLayout };
