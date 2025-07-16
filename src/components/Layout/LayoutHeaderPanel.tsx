import { HeaderPanel } from '@carbon/react';
import { type FC } from 'react';

import './index.scss';
import { useLayout } from '@/context/layout';

export const LayoutHeaderPanel: FC = () => {
  const { isHeaderPanelOpen, closeHeaderPanel } = useLayout();

  if (!isHeaderPanelOpen) return null;

  return (
    <HeaderPanel expanded>
      <div className="right-panel">
        <p>Hello, User!</p>
        <button onClick={closeHeaderPanel}>Close</button>
      </div>
    </HeaderPanel>
  );
};
