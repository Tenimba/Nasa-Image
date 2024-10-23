import axios from 'axios';

export const searchImages = async (query, mediaType = "image,video") => {
    let NASA_API_URL = "https://images-api.nasa.gov/search";

    if (query) {
        NASA_API_URL += `&q=${query}`;
    }
    if (mediaType) {
        NASA_API_URL += `?media_type=${mediaType}`;
    }
    const response = await axios.get(NASA_API_URL);
    return response;
};

export const getAsset = async (nasaId) => {
    const NASA_API_URL = `https://images-api.nasa.gov/asset/${nasaId}`;
    const response = await axios.get(NASA_API_URL);
    return response.data.collection;
}

