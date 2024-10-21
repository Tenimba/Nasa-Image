import { useParams, useNavigate } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
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
import { searchImages } from '../api/nasa';
import { ImageContext } from '../context/ImageContext';
import { translateText } from '../api/translator';
import { LanguageSelector } from '../components/LanguageSelector';
import CloseIcon from '@mui/icons-material/Close';
import CustomCarousel from '../components/CustomCarousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageDetail = () => {
    const { nasa_id } = useParams();
    const navigate = useNavigate();
    const { images, setImages, searchQuery, setSearchQuery } = useContext(ImageContext);
    const [open, setOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const [translatedDescription, setTranslatedDescription] = useState('');
    const [translatedTitle, setTranslatedTitle] = useState('');
    const [translatedPhotographer, setTranslatedPhotographer] = useState('Photographer');
    const [translatedLocation, setTranslatedLocation] = useState('Location');
    const [translatedKeywords, setTranslatedKeywords] = useState('Keywords');
    const [translateSimilarImages, setTranslateSimilarImages] = useState('Similar images');

    const imageDetail = images.find(item => item.data[0].nasa_id === nasa_id);

    useEffect(() => {
        const translateFields = async () => {
            if (imageDetail) {
                try {
                    if (imageDetail.data[0].description) {
                        const translatedDesc = await translateText(imageDetail.data[0].description, selectedLanguage);
                        setTranslatedDescription(translatedDesc);
                    }

                    if (imageDetail.data[0].title) {
                        const translatedTitle = await translateText(imageDetail.data[0].title, selectedLanguage);
                        setTranslatedTitle(translatedTitle);
                    }

                    const translatedPhotographer = await translateText("Photographer", selectedLanguage);
                    setTranslatedPhotographer(translatedPhotographer);

                    const translatedLocation = await translateText("Location", selectedLanguage);
                    setTranslatedLocation(translatedLocation);

                    const translatedKeywords = await translateText("Keywords", selectedLanguage);
                    setTranslatedKeywords(translatedKeywords);

                    const translateSimilarImages = await translateText("Similar images", selectedLanguage);
                    setTranslateSimilarImages(translateSimilarImages);


                } catch (error) {
                    console.error('Erreur lors de la traduction:', error);
                }
            }
        };

        translateFields();
    }, [imageDetail, selectedLanguage]);

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

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
                Retour
            </Button>
            <LanguageSelector selectedLanguage={selectedLanguage} handleLanguageChange={handleLanguageChange} />
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
                            {translatedTitle || imageDetail.data[0].title}
                        </Typography>

                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            <strong>{translatedPhotographer} :</strong>
                            {imageDetail.data[0].photographer || 'Non spécifié'}
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            <strong>{translatedLocation} :</strong>
                            {imageDetail.data[0].location || 'Non spécifié'}
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 2 }}>
                            <strong>Date :</strong> {imageDetail.data[0].date_created.split('T')[0]}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 2 }}>
                            {translatedDescription || 'Chargement...'}
                        </Typography>

                        {imageDetail.data[0].keywords && (
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="h6" sx={{ marginBottom: 1 }}>{translatedKeywords}</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {imageDetail.data[0].keywords.map((keyword, index) => (
                                        <Chip
                                            key={index}
                                            label={keyword}
                                            onClick={() => handleSearch(keyword)}
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
            <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2, fontWeight: 'bold', textAlign: 'center' }}>{translateSimilarImages}</Typography>
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
