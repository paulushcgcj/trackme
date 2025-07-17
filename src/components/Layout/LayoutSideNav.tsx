import { SideNav, SideNavItems, SideNavLink, SideNavMenu, SideNavMenuItem } from '@carbon/react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';
import { useLayout } from '@/context/layout';
import { ROUTE_PATHS, type RouteDescription } from '@/routes/routePaths';

export const LayoutSideNav: FC = () => {
  const { isSideNavExpanded } = useLayout();

  const renderMenuLink = (route: RouteDescription) => (
    <SideNavLink key={route.name} as={Link} to={route.path}>
      {route.name}
    </SideNavLink>
  );

  const renderMenuItem = (route: RouteDescription) => (
    <SideNavMenu title={route.name} isActive={false}>
      {route.children
        ?.filter((childRoute) => childRoute.isMenuItem)
        .map((childRoute) => (
          <SideNavMenuItem key={childRoute.name} as={Link} to={childRoute.path} isActive={false}>
            {childRoute.name}
          </SideNavMenuItem>
        ))}
    </SideNavMenu>
  );

  return (
    <SideNav expanded={isSideNavExpanded} isPersistent={false}>
      <SideNavItems>
        {Object.values(ROUTE_PATHS)
          .filter((route) => route.isMenuItem)
          .map((route) => (route.children ? renderMenuItem(route) : renderMenuLink(route)))}
      </SideNavItems>
    </SideNav>
  );
};
