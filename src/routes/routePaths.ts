export type RouteDescription = {
  name: string;
  path: string;
  isMenuItem: boolean;
  isTopLevel?: boolean;
  children?: RouteDescription[];
};

export const ROUTE_PATHS: Record<string, RouteDescription> = {
  home: { name: 'Home', path: '/', isMenuItem: false },
  dashboard: { name: 'Dashboard', path: '/dashboard', isMenuItem: true, isTopLevel: true },
  vehicles: {
    name: 'Vehicles',
    path: '/vehicles',
    isMenuItem: true,
    isTopLevel: true,
    children: [
      { name: 'Vehicles', path: '/vehicles', isMenuItem: true },
      { name: 'Add Vehicle', path: '/vehicles/add', isMenuItem: true },
      { name: 'History', path: '/vehicles/history', isMenuItem: true },
      { name: 'Reports', path: '/vehicles/reports', isMenuItem: true },
      { name: 'Vehicle Types', path: '/vehicles/types', isMenuItem: true },
      { name: 'Vehicle Groups', path: '/vehicles/groups', isMenuItem: true },
    ],
  },
  drivers: {
    name: 'Drivers',
    path: '/drivers',
    isMenuItem: true,
    isTopLevel: true,
    children: [
      { name: 'Drivers', path: '/drivers', isMenuItem: true },
      { name: 'Add Driver', path: '/drivers/add', isMenuItem: true },
      { name: 'Associate Driver', path: '/drivers/associate', isMenuItem: true },
      { name: 'Reports', path: '/drivers/reports', isMenuItem: true },
    ],
  },
  zones: {
    name: 'Zones',
    path: '/zones',
    isMenuItem: true,
    isTopLevel: true,
    children: [
      { name: 'Zones', path: '/zones', isMenuItem: true },
      { name: 'Add Zone', path: '/zones/add', isMenuItem: true },
    ],
  },
  settings: { name: 'Settings', path: '/settings', isMenuItem: true },
  notFound: { name: 'Not Found', path: '*', isMenuItem: false },
};
