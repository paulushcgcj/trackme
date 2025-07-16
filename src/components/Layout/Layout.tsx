import { Content } from '@carbon/react';

import { LayoutProvider } from '@/context/layout';

import { LayoutHeader } from './LayoutHeader';
import { LayoutHeaderPanel } from './LayoutHeaderPanel';
import { LayoutSideNav } from './LayoutSideNav';

import type { FC, ReactNode } from 'react';

import './index.scss';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <LayoutProvider>
      <div className="layout">
        <LayoutHeader />
        <LayoutSideNav />
        <LayoutHeaderPanel />
        <Content className="content-body">{children}</Content>
      </div>
    </LayoutProvider>
  );
};

export default Layout;
