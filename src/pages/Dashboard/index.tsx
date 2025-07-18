import { type FC } from 'react';

import Map from '@/components/Map';

import './index.scss';

const Dashboard: FC = () => {
  return (
    <div className="dashboard-body">
      <Map position={[48.43737, -123.35883]} zoomLevel={13} />
    </div>
  );
};

export default Dashboard;
