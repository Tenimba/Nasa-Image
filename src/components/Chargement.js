import React from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';

const Chargement = () => {

  return (
    <>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" />
        <Typography variant="h5" sx={{ color: '#2c387e' }}>Chargement en cours...</Typography>
      </Grid>
    </>
  );
};

export default Chargement;
