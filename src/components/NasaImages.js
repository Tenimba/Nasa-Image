import React, { useContext } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ImageContext } from '../context/ImageContext';

const NasaImages = () => {
  const { images } = useContext(ImageContext);

  if (images.length === 0) return <p>Aucune image trouvée.</p>;

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
    <Grid item xs={12}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
        Photos de la nasa
      </Typography>
      <Typography variant="h6" align="center" sx={{ color: 'gray', marginBottom: 2 }}>
        Découvrez les images capturées par les rovers sur Mars selon vos filtres.
      </Typography>
    </Grid>
    <Grid container spacing={3}>
      {images.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.data[0].nasa_id}>
          <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6,
                },
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
              <Typography variant="h6">{item.data[0].title}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Grid>
  );
};

export default NasaImages;
