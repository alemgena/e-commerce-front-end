import React, { useEffect, useState } from 'react';
import axios from 'axios';
interface InputProps {
  text: string;
  language: string;
}
 
const Convert: React.FC<InputProps> = ({text,language}) => {
  const [convertedText, setConvertedText] = useState('');

  useEffect(() => {
    const response = axios
      .post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: text,
            target: language,
            key: 'AIzaSyDdfMxmTxz8u1XdD99_JCEX_9S41PbcJPE',
          },
        }
      )
      .then((response) => {
        setConvertedText(response.data.data.translations[0].translatedText);
      })
      .catch((err) => {
        console.log('rest api error', err);
      });
  }, [text, language]);

  return <div>{convertedText}</div>;
};

export default Convert;
