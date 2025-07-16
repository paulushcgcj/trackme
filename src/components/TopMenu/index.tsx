import { type FC } from 'react';
import './index.scss';
import { Header } from '@carbon/react';

const TopMenu: FC = () => {
  return (
    <Header>
      <p>This is the child</p>
    </Header>
  );
};

export default TopMenu;
