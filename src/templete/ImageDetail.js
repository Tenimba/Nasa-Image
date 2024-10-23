import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
    Dialog,
    DialogContent,
    IconButton,
} from '@mui/material';
import { searchImages } from '../api/nasa';
import { ImageContext } from '../context/ImageContext';
import { translateText } from '../api/translator';
import LanguageSelector from '../components/LanguageSelector';
import CloseIcon from '@mui/icons-material/Close';
import CustomCarousel from '../components/CustomCarousel';
import DOMPurify from 'dompurify';
import FavoriteToggle  from '../components/FavoriteToggle';
import useTranslation from '../components/UseTranslation';

const ImageDetail = () => {
    const navigate = useNavigate();
    const { nasa_id } = useParams();
    const { images, setImages, setSearchQuery, setLoading, selectedLanguage, setSelectedLanguage } = useContext(ImageContext);
    const [open, setOpen] = useState(false);
    const imageDetail = images.find(item => item.data[0].nasa_id === nasa_id);
    const [translatedDescription, setTranslatedDescription] = useState('');
    const [translatedTitle, setTranslatedTitle] = useState('');
    const {
        photographer,
        location,
        keywords,
        similarImages,
    } = useTranslation(selectedLanguage);

    useEffect(() => {
        const translateFields = async () => {
            if (imageDetail) {
                try {
                    if (imageDetail.data[0].description) {
                        const translatedDesc = await translateText(imageDetail.data[0].description, selectedLanguage);
                        const sanitizedDesc = DOMPurify.sanitize(translatedDesc);
                        setTranslatedDescription(sanitizedDesc);
                    }

                    if (imageDetail.data[0].title) {
                        const translatedTitle = await translateText(imageDetail.data[0].title, selectedLanguage);
                        setTranslatedTitle(translatedTitle);
                    }

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
        return <Typography variant="h6" textAlign="center" color="white">Les détails de l'image ne sont pas disponibles.</Typography>;
    }

    const handleOpenImage = () => {
        setOpen(true);
    };

    const handleCloseImage = () => {
        setOpen(false);
    };

    const handleSearch = (keyword) => {
        setSearchQuery(keyword);
        setImages([]);
        setLoading(true);
        try {
            searchImages(keyword).then(response => {
                setImages(response.data.collection.items);
            });
            setLoading(false);
            navigate('/');
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ padding: 4, minHeight: '100vh', position: 'relative' }}>
            <LanguageSelector selectedLanguage={selectedLanguage} handleLanguageChange={handleLanguageChange} />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
                <Card sx={{
                    maxWidth: 600,
                    width: '100%',
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: 'hidden',
                    backgroundColor: '#07114d',
                    color: '#fff',
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
                            },
                            backgroundColor: '#2c387e',
                        }}
                        onClick={handleOpenImage}
                    />
                    <FavoriteToggle />
                    <CardContent sx={{ padding: 2 }}>
                        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', textAlign: 'center' }}>
                            {translatedTitle || imageDetail.data[0].title}
                        </Typography>

                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            <strong>{photographer} :</strong>
                            {imageDetail.data[0].photographer || 'Non spécifié'}
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            <strong>{location} :</strong>
                            {imageDetail.data[0].location || 'Non spécifié'}
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 2 }}>
                            <strong>Date :</strong> {imageDetail.data[0].date_created.split('T')[0]}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ marginBottom: 2 }}
                            dangerouslySetInnerHTML={{ __html: translatedDescription }}
                        />

                        {imageDetail.data[0].keywords && (
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="h6" sx={{ marginBottom: 1 }}>{keywords}</Typography>
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

            <Typography variant="h6"
                sx={{
                    marginTop: 4,
                    marginBottom: 2,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: ' #fff',
                }}
            >
                {similarImages}
            </Typography>
            <CustomCarousel images={images} navigate={navigate} />

            <Dialog open={open} onClose={handleCloseImage} maxWidth="lg">
                <DialogContent sx={{ padding: 0 }}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseImage}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img
                        src={imageDetail.links[0].href}
                        alt="NASA Image"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ImageDetail;

