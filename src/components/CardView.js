import React, { useEffect, useContext, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ImageContext } from '../context/ImageContext';

export const CardView = ({ images }) => {
  const { sortOrder } = useContext(ImageContext);
  const [sortedImages, setSortedImages] = useState([]);

  useEffect(() => {
    if (!Array.isArray(images)) {
      setSortedImages([]);
      return;
    }

    const sorted = [...images].sort((a, b) => {
      const dateA = new Date(a.data[0].date_created);
      const dateB = new Date(b.data[0].date_created);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setSortedImages(sorted);
  }, [images, sortOrder]);

  return (
    <Grid container spacing={3}>
      {sortedImages.length > 0 ? (
        sortedImages.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2}
            key={item.data[0].nasa_id}
            sx={{
              transition: 'opacity 0.5s ease-in',
            }}
          >
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6,
                  backgroundColor: 'black',
                },
                height: '100%',
                backgroundColor: '#2c387e',
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
                    color: 'white',
                  }}
                >
                  {item.data[0].title.length > 50
                    ? `${item.data[0].title.substring(0, 50)}...`
                    : item.data[0].title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" color="white">Aucune image trouvée.</Typography>
      )}
    </Grid>
  );
};

