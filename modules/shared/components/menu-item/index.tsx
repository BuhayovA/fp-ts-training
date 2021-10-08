import * as React from 'react';
// components
import Link from 'next/link';
// views
import { MenuI } from './views';

interface Props {
  href: string;
  label: string;
  active?: boolean;
  color?: string;
}

const MenuItem: React.FC<Props> = ({ href, label, active = false, color }) => (
  <MenuI active={active} color={color}>
    <Link href={href} passHref>
      <a>{label}</a>
    </Link>
  </MenuI>
);

export { MenuItem };
