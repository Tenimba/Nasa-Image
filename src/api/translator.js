import axios from 'axios';


export const translateText = async (text, targetLang = 'fr') => {

    const sourceLang = 'en';
  try {
    const url = "https://translate.googleapis.com/translate_a/single";

    const response = await axios.get(url, {
      params: {
          client: 'gtx',
          sl: sourceLang,
          tl: targetLang,
          dt: 't',
          q: text,
      },
  });

    const translatedText = response.data[0].map(item => item[0]).join(' ');

    return translatedText;
  } catch (error) {
    return text;
  }
};
