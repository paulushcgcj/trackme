import { type FC } from 'react';

import TopMenu from '@/components/TopMenu';
import './App.css';

const App: FC = () => {
  return (
    <>
      <TopMenu />
      <div className="app-content">
        <h1>Welcome to the App</h1>
        <p>This is the main content area.</p>
        <p>Feel free to explore the features.</p>
      </div>
    </>
  );
};

export default App;
