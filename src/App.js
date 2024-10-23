import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { ImageProvider } from './context/ImageContext';
import { Box } from '@mui/material';
import NasaImages from './templete/NasaImages';
import ImageDetail from './templete/ImageDetail';
import FilterMenu from './templete/FilterMenu';
import StarryScene from './components/StarryScene';
import FavoriteList from './templete/Favorites';

const App = () => (
  <Auth0Provider
  domain="dev-5a408gyk.eu.auth0.com"
  clientId="i4GrGGd44cAWpFl02rNH9AWF9vZKyLHb"
  redirectUri={window.location.origin}
>
  <ImageProvider>
    <Router>
      <Box sx={{ display: 'relative', overflow: 'hidden' }}>
        <StarryScene />
        <FilterMenu />
        <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
          <Routes>
            <Route path="/" element={<NasaImages />} />
            <Route path="/image/:nasa_id" element={<ImageDetail />} />
            <Route path="/favorites" element={<FavoriteList />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  </ImageProvider>
</Auth0Provider>
);

export default App;
