import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { ImageContext } from '../context/ImageContext';
import { CardView } from '../components/CardView';
import LanguageSelector from '../components/LanguageSelector';
import useTranslation from '../components/UseTranslation';
import Chargement from '../components/Chargement';

const NasaImages = () => {
  const { images, searchQuery, setSortOrder, sortOrder, loading, setLoading, selectedLanguage, setSelectedLanguage } = useContext(ImageContext);
  const [visibleImages, setVisibleImages] = useState(0);

  // Traductions basées sur la langue sélectionnée
  const {
    title,
    subtitle,
    subtitle2,
    trimmedTitle,
    desc,
    asc,
  } = useTranslation(selectedLanguage);

  // useEffect pour afficher progressivement les images
  useEffect(() => {
    if (images.length > 0 && visibleImages < images.length) {
      const interval = setInterval(() => {
        setVisibleImages(prevVisibleImages => {
          if (prevVisibleImages < images.length) {
            return prevVisibleImages + 1;
          } else {
            clearInterval(interval);
            return prevVisibleImages;
          }
        });
      }, 200);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, [images, visibleImages, setLoading]);

  // Gestion du changement de langue sélectionnée
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  // Trie les images par date de création, selon l'ordre choisi
  const sortedImages = [...images].sort((a, b) => {
    const dateA = new Date(a.data[0]?.date_created);
    const dateB = new Date(b.data[0]?.date_created);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Changer l'ordre de tri
  const handleSortChange = () => {
    setSortOrder(prevOrder => (prevOrder === 'desc' ? 'asc' : 'desc'));
  };

  return (
    <>
    {loading && <Chargement />}
      <Grid container spacing={3} sx={{ padding: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" sx={{ marginBottom: 4, fontWeight: 'bold', color: '#2c387e' }}>
            {title}
          </Typography>
          <Typography variant="h6" align="center" sx={{ color: 'gray', marginBottom: 2 }}>
            {subtitle}
            <span style={{ color: 'gray', marginBottom: 2 }}> {searchQuery ? subtitle2 : ''}</span>
            <span style={{ color: 'blue', fontWeight: 'bold' }}> {searchQuery}</span>
          </Typography>

          <Button
            variant="contained"
            onClick={handleSortChange}
            sx={{
              backgroundColor: '#2c387e',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#3f51b5',
              },
              marginBottom: 4,
            }}
          >
            {trimmedTitle} ({sortOrder === 'asc' ? asc : desc})
          </Button>
        </Grid>
        <Grid item xs={12}>
          <LanguageSelector selectedLanguage={selectedLanguage} handleLanguageChange={handleLanguageChange} />
        </Grid>

        <CardView images={sortedImages.slice(0, visibleImages)} />
      </Grid>
    </>
  );
};

export default NasaImages;
