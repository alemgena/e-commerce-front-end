import { TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';
import {
  HourglassEmptyRounded,
  HourglassEmptyOutlined,
} from '@mui/icons-material';
const Norecords = ({ col }) => {
  return (
    <div className="flex w-full items-center justify-center py-8 px-2 md:p-16">
      <Typography variant="h3">
        No records.
        <HourglassEmptyRounded color="primary" fontSize="inherit" />
      </Typography>
    </div>
  );
};

export default Norecords;
