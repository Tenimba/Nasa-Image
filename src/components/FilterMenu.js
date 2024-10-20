import React, { useContext } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { ImageContext } from '../context/ImageContext';

const FilterMenu = () => {
  const { setSortOrder, setFilterCriteria } = useContext(ImageContext);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterCriteria(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="sort-label">Trier par</InputLabel>
        <Select
          labelId="sort-label"
          onChange={handleSortChange}
          defaultValue=""
        >
          <MenuItem value="title">Titre</MenuItem>
          <MenuItem value="date_created">Date de création</MenuItem>
          <MenuItem value="photographer">Photographe</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="filter-label">Filtrer par</InputLabel>
        <Select
          labelId="filter-label"
          onChange={handleFilterChange}
          defaultValue=""
        >
          <MenuItem value="all">Tous</MenuItem>
          <MenuItem value="specific_criteria">Critères spécifiques</MenuItem>
        </Select>
      </FormControl>
      
      <Button variant="contained" color="primary">Appliquer</Button>
    </div>
  );
};

export default FilterMenu;
