import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  FormControl, FormControlLabel, Radio, RadioGroup
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Clear as ClearIcon } from '@mui/icons-material';
import { ImageContext } from '../context/ImageContext';
import { searchImages } from '../api/nasa';
import { useAuth0 } from '@auth0/auth0-react';
import useTranslation from '../components/UseTranslation';

const FilterMenu = ({ children }) => {
  const { setImages, searchQuery, setSearchQuery, loading, setLoading, selectedLanguage, setMediaType, mediaType } = useContext(ImageContext);
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    logoutText,
    login,
    yourFavorites,
    title,
    applyFilter,
  } = useTranslation(selectedLanguage);

  // Fonction de gestion des filtres : déclenche une recherche d'images via l'API
  const handleFilterChange = async () => {
    setLoading(true);
    setImages([]);
    try {
      const results = await searchImages(searchQuery);
      const items = results.data?.collection.items;

      // Filtrage des images et vidéos en fonction du type de média sélectionné
      let filteredItems = items;
      if (mediaType === 'image') {
        filteredItems = items.filter(item => item.data[0]?.media_type === 'image');
      } else if (mediaType === 'video') {
        filteredItems = items.filter(item => item.data[0]?.media_type === 'video');
      }

      setImages(filteredItems);
      setDrawerOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    } finally {
      setLoading(false);
    }
  };

  // remet à zéro le filtre de recherche
  const cleanFilter = async () => {
    setLoading(true);
    setSearchQuery('');
    setMediaType('image,video');
    try {
      const response = await searchImages();
      setImages(response.data?.collection.items);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour ouvrir et fermer le menu latéral
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Fonction pour choisir le type de média (image, vidéo, les deux)
  const choiceMediaType = (type) => {
    if (mediaType === type) {
      setMediaType('');
    } else {
      setMediaType(type);
    }
      setLoading(true);
      searchImages(searchQuery, type).then(response => {
        setImages(response?.data?.collection.items);
        setDrawerOpen(false);
      }).catch(error => {
        console.error('Erreur lors de la recherche:', error);
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        {isAuthenticated ? (
          <Button
            variant="contained"
            onClick={() => logout({ returnTo: window.location.origin })}
            sx={{
              backgroundColor: '#07114d',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'white',
                color: '#07114d',
              },
            }}
          >
            {logoutText}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => loginWithRedirect()}
            sx={{
              backgroundColor: '#07114d',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'white',
                color: '#07114d',
              },
            }}
          >
            {login}
          </Button>
        )}
      </Box>
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <IconButton
          onClick={toggleDrawer}
          color="primary"
          sx={{
            top: 16,
            left: 13,
            zIndex: 1000,
            position: 'absolute',
            marginRight: '10px'
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            flexGrow: 1,
            transition: 'margin 0.3s',
            marginLeft: drawerOpen ? '200px' : '0',
            padding: '16px',
          }}
        >
          {children}
        </Box>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          PaperProps={{
            sx: {
              backgroundColor: 'black',
              color: 'white',
            },
          }}
        >
          <Box
            sx={{
              width: 300,
              padding: 2,
              backgroundColor: 'black',
            }}
          >
            <IconButton onClick={toggleDrawer} sx={{ mb: 2, color: 'white' }}>
              <CloseIcon sx={{ color: 'white' }} />
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
                          <ClearIcon sx={{ color: 'white' }} />
                        </IconButton>
                      </InputAdornment>
                    ) : null,
                    style: { color: 'white' },
                  }}
                  sx={{
                    input: { color: 'white' },
                    label: { color: 'white' }
                  }}
                />
              </ListItem>
              <ListItem>
                <Button
                  variant="contained"
                  onClick={handleFilterChange}
                  disabled={loading}
                  fullWidth
                  sx={{
                    color: 'white',
                    backgroundColor: '#2c387e',
                    '&:hover': { backgroundColor: '#3f51b5' }
                  }}
                >
                  {loading ?
                    <CircularProgress size={24} /> :
                    applyFilter
                  }
                </Button>
              </ListItem>
              <ListItem sx={{ justifyContent: 'space-around' }}>
                <Button
                  variant={mediaType === 'image' ? 'contained' : 'outlined'}
                  onClick={() => choiceMediaType('image')}
                  fullWidth
                  sx={{
                    color: mediaType === 'image' ? 'white' : '#2c387e',
                    backgroundColor: mediaType === 'image' ? '#2c387e' : 'transparent',
                    borderColor: mediaType === 'image' ? 'transparent' : 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  Images
                </Button>
                <Button
                  variant={mediaType === 'video' ? 'contained' : 'outlined'}
                  onClick={() => choiceMediaType('video')}
                  fullWidth
                  sx={{
                    color: mediaType === 'video' ? 'white' : '#2c387e',
                    backgroundColor: mediaType === 'video' ? '#2c387e' : 'transparent',
                    borderColor: mediaType === 'video' ? 'transparent' : 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  Vidéos
                </Button>
                <Button
                  variant={mediaType === 'image,video' ? 'contained' : 'outlined'}
                  onClick={() => choiceMediaType('image,video')}
                  fullWidth
                  sx={{
                    color: mediaType === 'image,video' ? 'white' : '#2c387e',
                    backgroundColor: mediaType === 'image,video' ? '#2c387e' : 'transparent',
                    borderColor: mediaType === 'image,video' ? 'transparent' : 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  Tous
                </Button>
              </ListItem>

              {location.pathname === '/favorites' ? (
                <ListItem>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/')}
                    sx={{
                      width: '100%',
                      marginTop: 5,
                      backgroundColor: '#07114d',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: 'white',
                        color: '#07114d',
                      },
                    }}
                  >
                    {title}
                  </Button>
                </ListItem>
              ) : location.pathname === '/' ? (
                <ListItem>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/favorites')}
                    sx={{
                      width: '100%',
                      marginTop: 5,
                      backgroundColor: '#07114d',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: 'white',
                        color: '#07114d',
                      },
                    }}
                  >
                    {yourFavorites}
                  </Button>
                </ListItem>
              ) : (
                <>
                  <ListItem>
                    <Button
                      variant="contained"
                      onClick={() => navigate('/favorites')}
                      sx={{
                        width: '100%',
                        marginTop: 5,
                        backgroundColor: '#07114d',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: 'white',
                          color: '#07114d',
                        },
                      }}
                    >
                      {yourFavorites}
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      variant="contained"
                      onClick={() => navigate('/')}
                      sx={{
                        width: '100%',
                        marginTop: 5,
                        backgroundColor: '#07114d',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: 'white',
                          color: '#07114d',
                        },
                      }}
                    >
                      {title}
                    </Button>
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default FilterMenu;
