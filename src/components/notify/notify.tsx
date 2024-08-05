'use client';
import * as React from 'react';
import { useState, useContext } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { UserContext } from '@/app/context/userContext';

const Alert = React.forwardRef((props:any, ref: any) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notifi({ notifi }: any): any {
  const [open, setOpen] = useState(true);
  const { setNotifi } = useContext(UserContext);
  // console.log(notifi);

  const handleClose = (event: any, reason:any) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setNotifi({message:null,type:null});
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notifi?.type || 'error'} sx={{ width: '100%' }}>
          {notifi?.message || ''}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
}