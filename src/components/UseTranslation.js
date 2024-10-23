import { useState, useEffect } from 'react';
import { translateText } from '../api/translator';

const useTranslations = (selectedLanguage) => {
    const [translations, setTranslations] = useState({
        title: 'NASA Photos',
        subtitle: 'Discover the images captured by NASA',
        subtitle2: 'for the search :',
        trimmedTitle: 'Sort by date',
        desc: 'Ascending',
        asc: 'descending',
        describe: 'Description',
        photographer: 'Photographer',
        location: 'Location',
        keywords: 'Keywords',
        details: 'Image details are not available.',
        similarImage: 'Similar images',
        yourFavorites: 'Your Favorites',
        emptyFavorites: 'No favorites found',
        removeAllFavorites: 'Remove all favorites',
        logoutText: 'Logout',
        login: 'Login',
        applyFilter: 'Wanted'

    });

    // Effect pour traduire les textes statiques
    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                const translatedTitle = await translateText('NASA Photos', selectedLanguage);
                const translatedSubtitle = await translateText('Discover the images captured by NASA', selectedLanguage);
                const translatedSubtitle2 = await translateText('for the search :', selectedLanguage);
                const translatedTrimmedTitle = await translateText('Sort by date', selectedLanguage);
                const translatedDesc = await translateText('Ascending', selectedLanguage);
                const translateAsc = await translateText('descending', selectedLanguage);
                const translatedPhotographer = await translateText('Photographer', selectedLanguage);
                const translatedLocation = await translateText('Location', selectedLanguage);
                const translatedKeywords = await translateText('Keywords', selectedLanguage);
                const translateSimilarImages = await translateText('Similar images', selectedLanguage);
                const translatedDetails = await translateText('Image details are not available.', selectedLanguage);
                const translatedYourFavorites = await translateText('Your Favorites', selectedLanguage);
                const translatedEmptyFavorites = await translateText('No favorites found', selectedLanguage);
                const translatedRemoveAllFavorites = await translateText('Remove all favorites', selectedLanguage);
                const translatedLogout = await translateText('Logout', selectedLanguage);
                const translatedLogin = await translateText('Login', selectedLanguage);
                const translatedFilter = await translateText('Wanted', selectedLanguage);


                setTranslations({
                    title: translatedTitle,
                    subtitle: translatedSubtitle,
                    subtitle2: translatedSubtitle2,
                    trimmedTitle: translatedTrimmedTitle,
                    desc: translatedDesc,
                    asc: translateAsc,
                    details: translatedDetails,
                    photographer: translatedPhotographer,
                    location: translatedLocation,
                    keywords: translatedKeywords,
                    similarImage: translateSimilarImages,
                    yourFavorites: translatedYourFavorites,
                    emptyFavorites: translatedEmptyFavorites,
                    removeAllFavorites: translatedRemoveAllFavorites,
                    logoutText: translatedLogout,
                    login: translatedLogin,
                    applyFilter: translatedFilter
                });
            } catch (error) {
                console.error('Error fetching translations:', error);
            }
        };

        fetchTranslations();
    }, [selectedLanguage]);

    return translations;
};

export default useTranslations;
