import React from 'react';
// hooks
import { useRouter } from 'next/router';
// components
import Menu from '@md-shared/layouts/main/components/header/components/menu';
// views
import {
  Logo,
  ScreenTitle,
  Wrapper,
  Line2,
  Line3,
  Line1,
  MenuBtn
} from '@md-shared/layouts/main/components/header/views';

interface Props {
  expanded: boolean;
  toggleMenu: () => void;
}

const Header: React.FC<Props> = ({ toggleMenu, expanded }) => {
  const { push } = useRouter();
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

      <MenuBtn isScroll={isScroll} onClick={toggleMenu} isActive={expanded}>
        <Line1 isActive={expanded}></Line1>
        <Line2 isActive={expanded}></Line2>
        <Line3 isActive={expanded}></Line3>
      </MenuBtn>

      <Menu isScroll={isScroll} expanded={expanded} />
    </Wrapper>
  );
};

export default Header;
