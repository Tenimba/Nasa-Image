import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Snackbar, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth0 } from '@auth0/auth0-react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ImageContext } from '../context/ImageContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavoriteToggle = () => {
    const { isAuthenticated, loginWithRedirect, user} = useAuth0();
    const { images, setFavoriteImages } = useContext(ImageContext);
    const { nasa_id } = useParams();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const imageDetail = images.find(item => item.data[0].nasa_id === nasa_id);

    // Effect pour vérifier si l'image est déjà dans les favoris
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isAlreadyFavorite = favorites.some(fav => fav.data[0].nasa_id === nasa_id);
        setIsFavorite(isAlreadyFavorite);
    }
    , [nasa_id]);

    // Fonction pour ajouter ou supprimer une image des favoris
    // Si l'utilisateur n'est pas connecté, un message d'alerte s'affiche
    const toggleFavorite = () => {
        if (!isAuthenticated) {
            setSnackbarOpen(true);
            setTimeout(() => {
                if (snackbarOpen) {
                    loginWithRedirect();
                }
            }, 100);
            return;
        }
            
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isAlreadyFavorite = favorites.some(fav => fav.data[0].nasa_id === nasa_id);
    
        if (isAlreadyFavorite) {
            favorites = favorites.filter(fav => fav.data[0].nasa_id !== nasa_id);
            setFavoriteImages(imageDetail, true);
        } else {
            favorites.push({ ...imageDetail, user_id: user.sub });
            setFavoriteImages(imageDetail, false);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
    };
    // Fonction pour fermer le message d'alerte
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <IconButton onClick={toggleFavorite} sx={{ color: isFavorite ? 'red' : 'gray' }}>
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={null}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="warning"
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleCloseSnackbar}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    Vous n'êtes pas connecté, merci de vous connecter avant l'ajout aux favoris.
                </Alert>
            </Snackbar>
        </>
    );
};

export default FavoriteToggle;
