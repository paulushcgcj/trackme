import { UserAvatar, Notification } from '@carbon/icons-react';
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuButton,
  HeaderNavigation,
  HeaderMenuItem,
} from '@carbon/react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';
import { useLayout } from '@/context/layout';
import { ROUTE_PATHS } from '@/routes/routePaths';

export const LayoutHeader: FC = () => {
  const { isSideNavExpanded, toggleSideNav, toggleHeaderPanel } = useLayout();

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
        <HeaderMenuItem as={Link} to={ROUTE_PATHS.dashboard.path} isActive={false}>
          {ROUTE_PATHS.dashboard.name}
        </HeaderMenuItem>
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
