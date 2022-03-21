import React, { useState } from 'react';
import {Snackbar, Alert,} from '@mui/material';

export default function ShowSnackBar(props)  {
  const { show, message, handleClose } = props;
  return (
    <>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={show} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant='filled' onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};



