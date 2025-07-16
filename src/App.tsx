import { type FC } from 'react';

import Layout from '@/components/Layout';
import AppRoutes from '@/routes/AppRoutes';

import './App.css';

const App: FC = () => {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default App;
