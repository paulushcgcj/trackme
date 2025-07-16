import { lazy } from 'react';

import { ROUTE_PATHS, type RouteDescription } from './routePaths';

const Home = lazy(() => import('@/pages/Home'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Settings = lazy(() => import('@/pages/Settings'));
const NotFound = lazy(() => import('@/pages/NotFound'));

type RouteConfigDescription = RouteDescription & {
  element: React.ReactNode;
};

export const routeConfig: RouteConfigDescription[] = [
  {
    ...ROUTE_PATHS.home,
    element: <Home />,
  },
  {
    ...ROUTE_PATHS.dashboard,
    element: <Dashboard />,
  },
  {
    ...ROUTE_PATHS.settings,
    element: <Settings />,
  },
  {
    ...ROUTE_PATHS.notFound,
    element: <NotFound />,
  },
];
