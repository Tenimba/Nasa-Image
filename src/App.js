import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NasaImages from './templete/NasaImages';
import ImageDetail from './templete/ImageDetail';
import FilterMenu from './templete/FilterMenu';
import { ImageProvider } from './context/ImageContext'; 
import { Box } from '@mui/material';

const App = () => (
  <ImageProvider>
    <Router>
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <FilterMenu />
        <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
      <Routes>
        <Route path="/" element={<NasaImages />} />
        <Route path="/image/:nasa_id" element={<ImageDetail />} />
      </Routes>
        </Box>
      </Box>
    </Router>
  </ImageProvider>
);

export default App;
