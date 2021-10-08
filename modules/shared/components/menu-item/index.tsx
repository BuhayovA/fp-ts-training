import * as React from 'react';
// components
import Link from 'next/link';
// views
import { MenuI } from './views';

interface Props {
  href: string;
  label: string;
  active?: boolean;
}

const MenuItem: React.FC<Props> = ({ href, label, active = false }) => (
  <MenuI active={active}>
    <Link href={href} passHref>
      <a>{label}</a>
    </Link>
  </MenuI>
);

export { MenuItem };
