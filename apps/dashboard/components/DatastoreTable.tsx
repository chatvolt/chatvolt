/* eslint-disable jsx-a11y/anchor-is-valid */
import SettingsIcon from '@mui/icons-material/Settings';
import Chip from '@mui/joy/Chip';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import { ColorPaletteProp } from '@mui/joy/styles';
import Table from '@mui/joy/Table';
import Tooltip from '@mui/joy/Tooltip'; // Importe Tooltip
import Typography from '@mui/joy/Typography';
import Link from 'next/link';
import * as React from 'react';

import { RouteNames } from '@chatvolt/lib/types';
import { Datastore as PrismaDatastore } from '@chatvolt/prisma';

interface Datastore extends PrismaDatastore {
  agentCount?: number;
  agentNames?: string;
}

export default function DatastoreTable({ items }: { items: Datastore[] }) {
  return (
    <React.Fragment>
      <Sheet
        className="DatastoreTableContainer"
        variant="outlined"
        sx={{
          width: '100%',
          borderRadius: 'md',
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': (theme) =>
              theme.vars.palette.background.level1,
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': (theme) =>
              theme.vars.palette.background.level1,
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 120, padding: 12 }}>Name</th>
              <th style={{ width: 120, padding: 12 }}>Nb Datasources</th>
              <th style={{ width: 220, padding: 12 }}>Visibility</th>
              <th style={{ width: 120, padding: 12 }}>In Use</th>
              <th style={{ width: 160, padding: 12 }}> </th>
            </tr>
          </thead>
          <tbody>
            {items.map((datastore) => (
              <tr key={datastore.id}>
                <td>
                  <div className="flex flex-col">
                    <Link href={`${RouteNames.DATASTORES}/${datastore.id}`}>
                      <Typography
                        className="truncate hover:underline"
                        fontWeight={'bold'}
                        color="primary"
                      >
                        {datastore.name}
                      </Typography>
                    </Link>
                  </div>
                </td>
                <td>
                  <Typography>
                    {(datastore as any)?._count?.datasources}
                  </Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    color={
                      {
                        public: 'success',
                        private: 'neutral',
                      }[datastore.visibility] as ColorPaletteProp
                    }
                  >
                    {datastore.visibility}
                  </Chip>
                </td>
                <td>
                  <Tooltip title={datastore.agentNames || 'No agents'}>
                    <Chip
                      variant="soft"
                      size="sm"
                      color={datastore.agentCount ? 'success' : 'danger'}
                    >
                      {datastore.agentCount ? `${datastore.agentCount} agent${datastore.agentCount > 1 ? 's' : ''}` : 'Unused'}
                    </Chip>
                  </Tooltip>
                </td>
                <td>
                  <Link
                    href={`${RouteNames.DATASTORES}/${datastore.id}?tab=settings`}
                  >
                    <IconButton color="neutral" size="sm">
                      <SettingsIcon />
                    </IconButton>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}