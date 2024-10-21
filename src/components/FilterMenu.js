import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  List,
  ListItem,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Clear as ClearIcon } from '@mui/icons-material';
import { ImageContext } from '../context/ImageContext';
import { searchImages } from '../api/nasa';

const FilterMenu = ({ children }) => {
  const { setImages, searchQuery, setSearchQuery } = useContext(ImageContext);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleFilterChange = async () => {
    setLoading(true);
    try {
      const results = await searchImages(searchQuery);
      setImages(results.data.collection.items);
      setDrawerOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    } finally {
      setLoading(false);
    }
  };

  const cleanFilter = async () => {
    setLoading(true);
    setSearchQuery('');
    try {
      const response = await searchImages();
      setImages(response.data.collection.items);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <IconButton onClick={toggleDrawer} color="primary" sx={{ top: 16, left: 13, zIndex: 1000, position: 'absolute', marginRight: '10px' }}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 300, padding: 2 }}>
          <IconButton onClick={toggleDrawer} sx={{ mb: 2 }}>
            <CloseIcon />
          </IconButton>
          <List>
            <ListItem>
              <TextField
                variant="outlined"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une image..."
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: searchQuery ? (
                    <InputAdornment position="end">
                      <IconButton onClick={cleanFilter}>
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                }}
              />
            </ListItem>

            <ListItem>
              <Button variant="contained" color="primary" onClick={handleFilterChange} disabled={loading} fullWidth>
                {loading ? <CircularProgress size={24} /> : 'Appliquer les filtres'}
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1, padding: '16px' }}>
        {children}
      </Box>
    </Box>
  );
};

export default FilterMenu;
