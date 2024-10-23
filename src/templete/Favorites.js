import React, { useEffect, useContext, useState } from 'react';
import {
    Typography,
    Box,
    Button,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { CardView } from '../components/CardView';
import { ImageContext } from '../context/ImageContext';
import LanguageSelector from '../components/LanguageSelector';
import useTranslation from '../components/UseTranslation';

const FavoriteList = () => {
    const { favoriteImages, setFavoriteImages, selectedLanguage, setSelectedLanguage } = useContext(ImageContext);
    const { isAuthenticated, user, loginWithRedirect } = useAuth0();
    const {
        yourFavorites,
        emptyFavorites,
        removeAllFavorites,
      } = useTranslation(selectedLanguage);


    useEffect(() => {
        if (isAuthenticated) {
            const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const userFavorites = storedFavorites.filter(fav => fav.user_id === user.sub);
            setFavoriteImages(userFavorites);
        } else {
            loginWithRedirect();
        }
    }, [isAuthenticated, user, loginWithRedirect, setFavoriteImages]);

    const handleRemoveAllFavorites = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const remainingFavorites = storedFavorites.filter(fav => fav.user_id !== user.sub);
        setFavoriteImages([]);
        localStorage.setItem('favorites', JSON.stringify(remainingFavorites));  // Mise à jour du localStorage
    };

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    return (
        <Box sx={{ padding: 4, minHeight: '100vh', color: '#2c387e' }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                {yourFavorites}
            </Typography>

            <LanguageSelector selectedLanguage={selectedLanguage} handleLanguageChange={handleLanguageChange} />

            <Button
                variant="contained"
                color="error"
                onClick={handleRemoveAllFavorites}
                sx={{ marginBottom: 3 }}
                disabled={!favoriteImages.length}
            >
                {removeAllFavorites}
            </Button>
            {favoriteImages.length > 0 ? (
                <CardView images={favoriteImages} />
            ) : (
                <Typography variant="h5" textAlign="center" sx={{ border: '2px solid #ccc', padding: 2 }}>
                    {emptyFavorites}
                </Typography>
            )}
        </Box>
    );
};

export default FavoriteList;
