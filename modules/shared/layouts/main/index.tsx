import * as React from 'react';
// views
import { ContentWrapper, ScreenTitle, Wrapper } from './views';

const MainLayout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <ContentWrapper>
        <ScreenTitle>Functional Programming with TypeScript</ScreenTitle>
        {children}
      </ContentWrapper>
    </Wrapper>
  );
};

export { MainLayout };
