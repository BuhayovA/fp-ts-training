import React from 'react';
// hooks
import { useRouter } from 'next/router';
// views
import { Logo, ScreenTitle, Wrapper } from '@md-shared/layouts/main/components/header/views';

const Header = () => {
  const { pathname, push } = useRouter();
  const [isScroll, setIsScroll] = React.useState(false);

  React.useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 20) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const goToHome = () => push('/');

  const isRouteActive = (route: string) => {
    const isHome = route === '/' && route === pathname;

    if (isHome) {
      return true;
    } else if (route !== '/') {
      return pathname.replace(/[/]/g, ' ').includes(route.replace(/[/]/g, ' '));
    }
    return false;
  };

  return (
    <Wrapper isScroll={isScroll}>
      <Logo
        onClick={goToHome}
        src={isScroll ? '/static/images/knowledge-white.png' : '/static/images/knowledge-black.png'}
        alt=''
      />

      <ScreenTitle onClick={goToHome} isScroll={isScroll}>
        FP-EXAMPLES
      </ScreenTitle>
    </Wrapper>
  );
};

export default Header;
