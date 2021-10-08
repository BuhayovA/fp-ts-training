import React from 'react';
// hooks
import { useRouter } from 'next/router';
// constants
import { menuItems } from '@md-shared/layouts/main/components/sidebar/constants';
// components
import { MenuItem } from '@md-shared/components/menu-item';
// views
import {
  Wrapper,
  ItemsWrapper,
  IWrapper,
  Scroll
} from '@md-shared/layouts/main/components/sidebar/components/menu-items/view';

interface Props {
  expanded: boolean;
  isScroll: boolean;
}

const MenuItems: React.FC<Props> = ({ expanded, isScroll }) => {
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
        {menuItems.map(({ l, h }) => (
          <IWrapper isScroll={isScroll} key={l}>
            <MenuItem active={isRouteActive(h)} key={l} href={h} label={l} />
          </IWrapper>
        ))}
      </ItemsWrapper>
    </Wrapper>
  );
};

export default MenuItems;
