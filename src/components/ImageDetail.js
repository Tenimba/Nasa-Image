import { useParams, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Button,
    Chip,
    Dialog,
    DialogContent,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ImageContext } from '../context/ImageContext';
import CustomCarousel from './CustomCarousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { searchImages } from '../api/nasa';

const ImageDetail = () => {
    const { nasa_id } = useParams();
    const navigate = useNavigate();
    const { images, setImages, searchQuery, setSearchQuery } = useContext(ImageContext);
    const [open, setOpen] = useState(false);

    const imageDetail = images.find(item => item.data[0].nasa_id === nasa_id);

    if (!imageDetail) {
        return <Typography variant="h6" textAlign="center">Les détails de l'image ne sont pas disponibles.</Typography>;
    }

    const handleOpenImage = () => {
        setOpen(true);
    };
    const handleCloseImage = () => {
        setOpen(false);
    };

    const handleSearch = (keyword) => {
        setSearchQuery(keyword);
        searchImages(keyword).then(response => {
            setImages(response.data.collection.items);
        });
        navigate('/');
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f4f4f9', minHeight: '100vh', position: 'relative' }}>
            <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{
                    position: 'fixed',
                    top: 16,
                    left: 16,
                    zIndex: 1000,
                    backgroundColor: '#0d47a1',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#002171',
                    },
                }}
            >
                Go Back
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
                <Card sx={{
                    maxWidth: 600,
                    width: '100%',
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                }}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={imageDetail.links[0].href}
                        alt="NASA Image"
                        sx={{
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            }
                        }}
                        onClick={handleOpenImage}
                    />
                    <CardContent sx={{ padding: 2 }}>
                        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', textAlign: 'center' }}>
                            {imageDetail.data[0].title}
                        </Typography>

                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            <strong>Photographer :</strong> {imageDetail.data[0].photographer || 'Non spécifié'}
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            <strong>location :</strong> {imageDetail.data[0].location || 'Non spécifié'}
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 2 }}>
                            <strong>Creation date :</strong> {imageDetail.data[0].date_created.split('T')[0]}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 2 }}>
                            {imageDetail.data[0].description}
                        </Typography>

                        {imageDetail.data[0].keywords && (
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="h6" sx={{ marginBottom: 1 }}>Mots-clés :</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {imageDetail.data[0].keywords.map((keyword, index) => (
                                        <Chip
                                            key={index}
                                            label={keyword}
                                            onClick={() => {
                                                handleSearch(keyword)
                                            }}
                                            sx={{
                                                cursor: 'pointer',
                                                backgroundColor: '#e0e0e0',
                                                '&:hover': { backgroundColor: '#bdbdbd' }
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>
            <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2, fontWeight: 'bold', textAlign: 'center' }}>Images similaires</Typography>
            <CustomCarousel images={images} navigate={navigate} />

            <Dialog open={open} onClose={handleCloseImage} maxWidth="lg">
                <DialogContent sx={{ position: 'relative' }}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseImage}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: '#fff',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img
                        src={imageDetail.links[0].href}
                        alt="NASA Image"
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 8,
                        }}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ImageDetail;
