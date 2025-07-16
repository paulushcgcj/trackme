import { Grid, Column } from '@carbon/react';

import Map from '@/components/Map';
import './index.scss';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@carbon/react';

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

const Home = () => {
  return (
    <Grid fullWidth className="home-page">
      {/* Header Row */}
      <Column sm={4} md={8} lg={16}>
        <h1 className="page-title">Dashboard</h1>
      </Column>

      {/* Map Row */}
      <Column sm={4} md={8} lg={16}>
        <div className="map-holder">
          <Map />
        </div>
      </Column>

      {/* Table Row */}
      <Column sm={4} md={8} lg={16}>
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
      </Column>
    </Grid>
  );
};

export default Home;
