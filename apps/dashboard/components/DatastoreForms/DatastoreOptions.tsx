import Chip from '@mui/joy/Chip';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import React from 'react';

import { DatastoreType } from '@chatvolt/prisma';

type Props = {
  onSelect: (type: DatastoreType) => any;
};

type DatsoreOption = {
  type: DatastoreType;
  label: string;
  description?: string;
  icon?: any;
  disabled?: boolean;
};

const options: DatsoreOption[] = [
  {
    type: DatastoreType.pinecone,
    label: 'Pinecone',
    // description: 'Vector database provider',
    // icon: '/pinecone-logo.svg',
  },
  {
    type: DatastoreType.qdrant,
    label: 'Qdrant',
    // description: 'Vector database provider',
    // icon: '/pinecone-logo.svg',
  },
];

const DatastoreOptions = (props: Props) => {
  return (
    <div className="flex space-x-4">
      <Stack className="space-y-4" direction={'row'} flexWrap={'wrap'}>
        {options.map((each) => (
          <Sheet
            key={each.type}
            variant="outlined"
            sx={{
              borderRadius: 'md',
              p: 1.5,
              width: '100%',
              ':hover': { cursor: 'pointer' },
            }}
            onClick={
              each.disabled ? undefined : () => props.onSelect(each.type)
            }
          >
            {each.icon && <img src={each.icon} className="w-16" alt="" />}

            <Stack gap={1}>
              <Stack gap={1} direction="row">
                <Typography level="body-md" fontWeight={'bold'}>
                  {each.label}
                </Typography>
                {each.disabled && (
                  <Chip variant="soft" color="neutral" size="sm">
                    Coming Soon
                  </Chip>
                )}
              </Stack>
              <Typography level="body-sm">{each.description}</Typography>
            </Stack>
          </Sheet>
        ))}
      </Stack>
    </div>
  );
};

export default DatastoreOptions;
