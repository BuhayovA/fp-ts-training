import * as React from 'react';
// components
import Header from '@md-shared/layouts/main/components/header';
// views
import { ContentWrapper, ScreenTitle, Wrapper } from './views';

interface Props {
  screenTitle?: string;
}

const MainLayout: React.FC<Props> = ({ children, screenTitle }) => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleMenu = () => setExpanded((prevState) => !prevState);

  // React.useEffect(() => {
  //   localStorage.setItem('expanded', localStorage.getItem('expanded') === null ? 'close' : expanded ? 'open' : 'close');
  // }, [expanded]);

  return (
    <Wrapper expanded={expanded}>
      <Header expanded={expanded} toggleMenu={toggleMenu} />

      <ContentWrapper>
        {screenTitle && <ScreenTitle>{screenTitle}</ScreenTitle>}
        {children}
      </ContentWrapper>
    </Wrapper>
  );
};

export { MainLayout };
