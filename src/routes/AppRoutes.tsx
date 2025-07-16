// src/routes/AppRoutes.tsx
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { routeConfig } from './routeConfig';

const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {routeConfig.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  </Suspense>
);

export default AppRoutes;
