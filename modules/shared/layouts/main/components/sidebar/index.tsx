import React from 'react';
// hooks
import { useRouter } from 'next/router';
// theme
import { colors } from '@md-styles/styled/theme';
// components
import { MenuItem } from '@md-shared/components/menu-item';
import MenuItems from '@md-shared/layouts/main/components/sidebar/components/menu-items';
// views
import {
  Logo,
  ScreenTitle,
  Wrapper,
  Line2,
  Line3,
  Line1,
  BurgerWrapper,
  LeftSide
} from '@md-shared/layouts/main/components/sidebar/views';

interface Props {
  expanded: boolean;
  toggleMenu: () => void;
}

const SideBar: React.FC<Props> = ({ toggleMenu, expanded }) => {
  const { push } = useRouter();

  const [isScroll, setIsScroll] = React.useState(false);

  const gitLinkColor = isScroll ? colors.blue350 : colors.red250;

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
      <LeftSide>
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
      </LeftSide>

      <MenuItem color={gitLinkColor} href='https://github.com/NeznaykaGM/fp-ts-training' label='GitHub' />
    </Wrapper>
  );
};

export default SideBar;
