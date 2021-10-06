import React from 'react';
// constants
import { menuItems } from '@md-shared/layouts/main/components/header/constants';
// components
import { MenuItem } from '@md-shared/layouts/main/components/header/components/menu/menu-items/components';
// views
import {
  Wrapper,
  ItemsWrapper,
  IWrapper,
  Scroll
} from '@md-shared/layouts/main/components/header/components/menu/view';
import { useRouter } from 'next/router';

interface Props {
  expanded: boolean;
  isScroll: boolean;
}

const Menu: React.FC<Props> = ({ expanded, isScroll }) => {
  const { pathname } = useRouter();

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
    <Wrapper isScroll={isScroll} expanded={expanded}>
      <ItemsWrapper expanded={expanded}>
        <Scroll>
          {menuItems.map(({ l, h }) => (
            <IWrapper isScroll={isScroll} key={l}>
              <MenuItem active={isRouteActive(h)} key={l} href={h} label={l} />
            </IWrapper>
          ))}
        </Scroll>
      </ItemsWrapper>
    </Wrapper>
  );
};

export default Menu;
