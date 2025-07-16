import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@carbon/react';
import { type FC } from 'react';

import MapLayout from '@/components/Map';

import './index.scss';

const headers = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status' },
];

const rows = [
  { id: '1', name: 'Sensor A', status: 'Active' },
  { id: '2', name: 'Sensor B', status: 'Offline' },
  { id: '3', name: 'Sensor C', status: 'Active' },
];

const Dashboard: FC = () => {
  return (
    <div className="dashboard-body">
      <MapLayout />
      <TableContainer title="Sensors">
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key}>{header.header}</TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {headers.map((header) => (
                  <TableCell key={header.key}>{row[header.key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
