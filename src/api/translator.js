import axios from 'axios';

export const translateText = async (text, targetLang = 'fr') => {

    const sourceLang = 'en';
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(text)}`;

    const response = await axios.get(url);

    const translatedText = response.data[0].map(item => item[0]).join(' ');

    return translatedText;
  } catch (error) {
    console.error('Erreur lors de la traduction :', error);
    return text;
  }
};
