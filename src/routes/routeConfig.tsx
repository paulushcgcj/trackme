import { lazy } from 'react';

import { ROUTE_PATHS } from './routePaths';

const Home = lazy(() => import('@/pages/Home'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Settings = lazy(() => import('@/pages/Settings'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export const routeConfig = [
  {
    path: ROUTE_PATHS.home,
    element: <Home />,
  },
  {
    path: ROUTE_PATHS.dashboard,
    element: <Dashboard />,
  },
  {
    path: ROUTE_PATHS.settings,
    element: <Settings />,
  },
  {
    path: ROUTE_PATHS.notFound,
    element: <NotFound />,
  },
];
