export type RouteDescription = {
  name: string;
  path: string;
};

export const ROUTE_PATHS: Record<string, RouteDescription> = {
  home: { name: 'Home', path: '/' },
  dashboard: { name: 'Dashboard', path: '/dashboard' },
  settings: { name: 'Settings', path: '/settings' },
  notFound: { name: 'Not Found', path: '*' },
};
