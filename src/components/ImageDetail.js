import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Button
} from '@mui/material';
import { ImageContext } from '../context/ImageContext';

const ImageDetail = () => {
  const { nasa_id } = useParams();
    const navigate = useNavigate();
  const { images } = useContext(ImageContext);

  const imageDetail = images.find(item => item.data[0].nasa_id === nasa_id);

  if (!imageDetail) {
    return <p>Les détails de l'image ne sont pas disponibles.</p>;
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
    <Button variant="contained" color="primary" onClick={() => navigate(-1)} sx={{ marginBottom: 4 }}>
        Retour
    </Button>
    <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: 4 }}>
        Détails de l'image
    </Typography>
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={imageDetail.links[0].href}
        alt="NASA Image"
      />
      <CardContent>
        <Typography variant="h5">{imageDetail.data[0].title}</Typography>
        <Typography variant="subtitle1">{imageDetail.data[0].date_created}</Typography>
        <Typography variant="body1">{imageDetail.data[0].photographer}</Typography>
        <Typography variant="body1">{imageDetail.data[0].location}</Typography>
        <Typography variant="body2">{imageDetail.data[0].description}</Typography>
        </CardContent>
    </Card>
    </Box>
    );
};


export default ImageDetail;
