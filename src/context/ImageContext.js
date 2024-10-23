import React, { createContext, useState, useEffect } from 'react';
import { searchImages } from '../api/nasa';
import Chargement from '../components/Chargement';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState("desc");
    const [favoriteImages, setFavoriteImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("en");

    useEffect(() => {
        const fetchData = async (query) => {
            setLoading(true);
            try {
                const response = await searchImages(query);
                if (response.data.collection.items.length > 0) {
                    setImages(response.data.collection.items);
                } else {
                    throw new Error('Aucun élément trouvé.');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <Chargement />
        )
    }

    if (error) {
        return <p>Erreur de chargement des images: {error}</p>;
    }

    return (
        <ImageContext.Provider value={{ 
            images, setImages,
            setSortOrder, sortOrder,
            searchQuery, setSearchQuery,
            loading, setLoading,
            favoriteImages, setFavoriteImages,
            selectedLanguage, setSelectedLanguage
            }
        }>
            {children}
        </ImageContext.Provider>
    );
};
