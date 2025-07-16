import { SideNav, SideNavItems, SideNavLink } from '@carbon/react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';
import { useLayout } from '@/context/layout';

export const LayoutSideNav: FC = () => {
  const { isSideNavExpanded } = useLayout();

  return (
    <SideNav expanded={isSideNavExpanded} isPersistent={false}>
      <SideNavItems>
        <SideNavLink as={Link} to={'/dashboard'}>
          Dashboard
        </SideNavLink>
        <SideNavLink as={Link} to={'/settings'}>
          Settings
        </SideNavLink>
      </SideNavItems>
    </SideNav>
  );
};
