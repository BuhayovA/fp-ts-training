import * as React from 'react';
// components
import SideBar from '@md-shared/layouts/main/components/sidebar';
// views
import { ContentWrapper, ScreenTitle, Wrapper } from './views';

interface Props {
  screenTitle?: string;
}

const MainLayout: React.FC<Props> = ({ children, screenTitle }) => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleMenu = () => setExpanded((prevState) => !prevState);

  return (
    <Wrapper expanded={expanded}>
      <SideBar expanded={expanded} toggleMenu={toggleMenu} />

      <ContentWrapper>
        {screenTitle && <ScreenTitle>{screenTitle}</ScreenTitle>}
        {children}
      </ContentWrapper>
    </Wrapper>
  );
};

export { MainLayout };
