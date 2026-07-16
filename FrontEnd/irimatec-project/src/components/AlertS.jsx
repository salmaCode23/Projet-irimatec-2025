import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertS() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2} className="fixed top-0 left-0 z-50">
      <Alert variant="filled" severity="success">
        This is a filled success Alert.
      </Alert>
      
    </Stack>
  );
}
