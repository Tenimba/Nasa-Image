import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { ImageContext } from '../context/ImageContext';
import { CardView } from '../components/CardView';
import LanguageSelector from '../components/LanguageSelector';
import useTranslation from '../components/UseTranslation';

const NasaImages = () => {
  const { images, searchQuery, setSortOrder, sortOrder, loading, setLoading, selectedLanguage, setSelectedLanguage } = useContext(ImageContext);
  const [ visibleImages, setVisibleImages ] = useState(0);
  const {
    title,
    subtitle,
    subtitle2,
    trimmedTitle,
    desc,
    asc,
  } = useTranslation(selectedLanguage);

  useEffect(() => {
    if (images.length > 0 && loading === false) {
      const interval = setInterval(() => {
        setVisibleImages((prev) => (prev < images.length ? prev + 1 : prev));
        if (visibleImages >= images.length - 1) {
          clearInterval(interval);
          setLoading(false);
        }
      }, 200);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, [images, visibleImages]);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const sortedImages = [...images].sort((a, b) => {
    const dateA = new Date(a.data[0].date_created);
    const dateB = new Date(b.data[0].date_created);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const handleSortChange = () => {
    setSortOrder(prevOrder => (prevOrder === 'desc' ? 'asc' : 'desc'));
  };

  return (
    <>
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
        <CardView images={sortedImages} />
      </Grid>
    </>
  );
};

export default NasaImages;
