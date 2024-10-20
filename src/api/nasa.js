import axios from 'axios';

export const searchImages = async () => {
  const NASA_API_URL = "https://images-api.nasa.gov/search?&media_type=image";
  const response = await axios.get(NASA_API_URL);
  return response;
};
