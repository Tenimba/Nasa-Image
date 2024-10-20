import React, { createContext, useState, useEffect } from 'react';
import { searchImages } from '../api/nasa';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await searchImages();
        console.log(response);

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
    return <p>Chargement des images...</p>;
  }

  if (error) {
    return <p>Erreur de chargement des images: {error}</p>;
  }

  return (
    <ImageContext.Provider value={{ images }}>
      {children}
    </ImageContext.Provider>
  );
};
