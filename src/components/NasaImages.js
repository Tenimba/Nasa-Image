import React, { useContext, useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ImageContext } from '../context/ImageContext';

const NasaImages = () => {
  const { images, searchQuery, setSortOrder, sortOrder } = useContext(ImageContext);

  const sortedImages = [...images].sort((a, b) => {
    const dateA = new Date(a.data[0].date_created);
    const dateB = new Date(b.data[0].date_created);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const handleSortChange = () => {
    setSortOrder(prevOrder => (prevOrder === 'desc' ? 'asc' : 'desc'));
  };

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
          Photos de la NASA
        </Typography>
        <Typography variant="h6" align="center" sx={{ color: 'gray', marginBottom: 2 }}>
          Découvrez les images capturées par la NASA
          <span style={{ color: 'gray', marginBottom: 2 }}> {searchQuery ? 'pour la recherche : ' : ''}</span>
          <span style={{ color: 'blue', fontWeight: 'bold' }}> {searchQuery}</span>
        </Typography>

        <Button
          variant="contained"
          onClick={handleSortChange}
          sx={{
            backgroundColor: '#2c387e',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#3f51b5',
            },
            marginBottom: 4,
          }}
        >
          Trier par date ({sortOrder === 'asc' ? 'Croissant' : 'Décroissant'})
        </Button>
      </Grid>

      <Grid container spacing={3}>
        {sortedImages.length > 0 ? (
          sortedImages.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={item.data[0].nasa_id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6,
                  },
                  height: '100%',
                }}
              >
                <Link to={`/image/${item.data[0].nasa_id}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.links[0].href}
                    alt={item.data[0].title}
                  />
                </Link>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.data[0].title.length > 50 ? `${item.data[0].title.substring(0, 50)}...` : item.data[0].title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <p>Aucune image trouvée.</p>
        )}
      </Grid>
    </Grid>
  );
};

export default NasaImages;
