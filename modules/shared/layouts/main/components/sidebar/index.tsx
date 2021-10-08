import React from 'react';
// hooks
import { useRouter } from 'next/router';
// components
import MenuItems from '@md-shared/layouts/main/components/sidebar/components/menu-items';
// views
import {
  Logo,
  ScreenTitle,
  Wrapper,
  Line2,
  Line3,
  Line1,
  BurgerWrapper
} from '@md-shared/layouts/main/components/sidebar/views';

interface Props {
  expanded: boolean;
  toggleMenu: () => void;
}

const SideBar: React.FC<Props> = ({ toggleMenu, expanded }) => {
  const { push } = useRouter();
  const [isScroll, setIsScroll] = React.useState(false);

  React.useEffect(() => {
    const scrollHandler = () => setIsScroll(window.scrollY > 20);

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

      <BurgerWrapper isScroll={isScroll} onClick={toggleMenu} isActive={expanded}>
        <Line1 isActive={expanded} />
        <Line2 isActive={expanded} />
        <Line3 isActive={expanded} />
      </BurgerWrapper>

      <MenuItems isScroll={isScroll} expanded={expanded} />
    </Wrapper>
  );
};

export default SideBar;
