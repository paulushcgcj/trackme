import { SideNav, SideNavItems, SideNavLink } from '@carbon/react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';
import { useLayout } from '@/context/layout';
import { ROUTE_PATHS } from '@/routes/routePaths';

export const LayoutSideNav: FC = () => {
  const { isSideNavExpanded } = useLayout();

  return (
    <SideNav expanded={isSideNavExpanded} isPersistent={false}>
      <SideNavItems>
        <SideNavLink as={Link} to={ROUTE_PATHS.dashboard.path}>
          {ROUTE_PATHS.dashboard.name}
        </SideNavLink>
        <SideNavLink as={Link} to={ROUTE_PATHS.settings.path}>
          {ROUTE_PATHS.settings.name}
        </SideNavLink>
      </SideNavItems>
    </SideNav>
  );
};
