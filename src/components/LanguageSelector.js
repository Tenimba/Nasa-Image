import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const LanguageSelector = ({ selectedLanguage, handleLanguageChange }) => {
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
          color: 'white',
          marginBottom: 2,
          '& .MuiInputLabel-root': {
            fontSize: '0.9rem',
            color: 'white',
          },
          '& .MuiOutlinedInput-root': {
            padding: '8px',
            color: 'white',
            backgroundColor: '#333',
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'lightgray',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'gray',
            },
          },
        }}
      >
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          label="Langue"
          sx={{
            backgroundColor: '#333',
            '& .MuiSelect-icon': {
              color: 'white',
            },
          }}
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

export default LanguageSelector;