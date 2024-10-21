import axios from 'axios';

export const searchImages = async (query) => {
    let NASA_API_URL = "https://images-api.nasa.gov/search?media_type=image";
    
    if (query) {
        NASA_API_URL += `&q=${query}`;
    }
    const response = await axios.get(NASA_API_URL);
    return response;
};


