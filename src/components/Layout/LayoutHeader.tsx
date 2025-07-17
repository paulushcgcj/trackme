import { UserAvatar, Notification } from '@carbon/icons-react';
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuButton,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderMenu,
} from '@carbon/react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';
import { useLayout } from '@/context/layout';
import { ROUTE_PATHS, type RouteDescription } from '@/routes/routePaths';

export const LayoutHeader: FC = () => {
  const { isSideNavExpanded, toggleSideNav, toggleHeaderPanel } = useLayout();

  const renderMenuLink = (route: RouteDescription) => (
    <HeaderMenuItem key={route.name} as={Link} to={route.path} isActive={false}>
      {route.name}
    </HeaderMenuItem>
  );

  const renderMenuItem = (route: RouteDescription) => (
    <HeaderMenu menuLinkName={route.name} isActive={false}>
      {route.children
        ?.filter((childRoute) => childRoute.isMenuItem)
        .map((childRoute) => (
          <HeaderMenuItem key={childRoute.name} as={Link} to={childRoute.path} isActive={false}>
            {childRoute.name}
          </HeaderMenuItem>
        ))}
    </HeaderMenu>
  );

  return (
    <Header aria-label="Track.me">
      <HeaderMenuButton
        aria-label="Open menu"
        isActive={isSideNavExpanded}
        onClick={toggleSideNav}
      />

      <HeaderName as={Link} to={ROUTE_PATHS.home.path} prefix="Track.me">
        {ROUTE_PATHS.home.name}
      </HeaderName>

      <HeaderNavigation aria-label="Track.me">
        {Object.values(ROUTE_PATHS)
          .filter((route) => route.isTopLevel && route.isMenuItem)
          .map((route) => (route.children ? renderMenuItem(route) : renderMenuLink(route)))}
      </HeaderNavigation>

      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Notifications" onClick={() => alert('Notifications')}>
          <Notification size={20} />
        </HeaderGlobalAction>

        <HeaderGlobalAction aria-label="Account" onClick={toggleHeaderPanel}>
          <UserAvatar size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
};
