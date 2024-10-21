import React, { useContext, useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ImageContext } from '../context/ImageContext';
import { LanguageSelector } from '../components/LanguageSelector';
import { translateText } from '../api/translator';

const NasaImages = () => {
  const { images, searchQuery, setSortOrder, sortOrder } = useContext(ImageContext);
  const [selectedLanguage, setSelectedLanguage] = useState('en');


  const [translatedTitle, setTranslatedTitle] = useState('NASA Photos');
  const [translatedSubtitle, setTranslatedSubtitle] = useState('Discover the images captured by NASA');
  const [translatedSubtitle2, setTranslatedSubtitle2] = useState('for the search :');
  const [translateTrimmedTitle, setTranslateTrimmedTitle] = useState('Sort by date');
  const [translateDesc , setTranslateDesc] = useState('Décroissant');
  const [translateAsc , setTranslateAsc] = useState('Croissant');

  useEffect(() => {
      const translateFields = async () => {
              try {

                  const translatedTitle = await translateText("NASA Photos", selectedLanguage);
                  setTranslatedTitle(translatedTitle);

                  const translatedSubtitle = await translateText("Discover the images captured by NASA", selectedLanguage);
                  setTranslatedSubtitle(translatedSubtitle);

                  const translatedSubtitle2 = await translateText("for the search :", selectedLanguage);
                  setTranslatedSubtitle2(translatedSubtitle2);

                  const translateTrimmedTitle = await translateText("Sort by date", selectedLanguage);
                  setTranslateTrimmedTitle(translateTrimmedTitle);

                  const translateDesc = await translateText("Ascending", selectedLanguage);
                  setTranslateDesc(translateDesc);

                  const translateAsc = await translateText("descending", selectedLanguage);
                  setTranslateAsc(translateAsc);


              } catch (error) {
                  console.error('Erreur lors de la traduction:', error);
              }
          };

      translateFields();
  }, [selectedLanguage]);

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
    <Grid container spacing={3} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
          {translatedTitle}
        </Typography>
        <Typography variant="h6" align="center" sx={{ color: 'gray', marginBottom: 2 }}>
          {translatedSubtitle}
          <span style={{ color: 'gray', marginBottom: 2 }}> {searchQuery ? translatedSubtitle2 : ''}</span>
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
          {translateTrimmedTitle} ({sortOrder === 'asc' ? translateAsc : translateDesc})
        </Button>
      </Grid>
      <Grid item xs={12}>
        <LanguageSelector selectedLanguage={selectedLanguage} handleLanguageChange={handleLanguageChange} />
      </Grid>

      <Grid container spacing={3}>
        {sortedImages.length > 0 ? (
          sortedImages.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={item.data[0].nasa_id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6,
                  },
                  height: '100%',
                }}
              >
                <Link to={`/image/${item.data[0].nasa_id}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.links[0].href}
                    alt={item.data[0].title}
                  />
                </Link>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.data[0].title.length > 50 ? `${item.data[0].title.substring(0, 50)}...` : item.data[0].title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <p>Aucune image trouvée.</p>
        )}
      </Grid>
    </Grid>
  );
};

export default NasaImages;
