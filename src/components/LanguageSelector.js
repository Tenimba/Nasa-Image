import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

export const LanguageSelector = ({ selectedLanguage, handleLanguageChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
      }}
    >
      <FormControl
        variant="outlined"
        sx={{
          width: '200px',
          marginBottom: 2,
          '& .MuiInputLabel-root': {
            fontSize: '0.9rem',
          },
          '& .MuiSelect-root': {
            fontSize: '0.9rem',
          },
          '& .MuiOutlinedInput-root': {
            padding: '8px'
          },
        }}
      >
        <InputLabel id="language-select-label">Langue</InputLabel>
        <Select
          labelId="language-select-label"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          label="Langue"
        >
          <MenuItem value="en">Anglais</MenuItem>
          <MenuItem value="fr">Français</MenuItem>
          <MenuItem value="es">Espagnol</MenuItem>
          <MenuItem value="de">Allemand</MenuItem>
          <MenuItem value="it">Italien</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
