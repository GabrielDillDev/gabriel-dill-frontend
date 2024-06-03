import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const LanguageContext = createContext();

async function translateText(text, targetLanguage) {
    const apiKey = import.meta.env.VITE_API_TRANSLATE_KEY;
    const region = 'brazilsouth';

    try {
        const response = await axios.post(
            `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLanguage}`, 
            [{ text }],
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': apiKey,
                    'Ocp-Apim-Subscription-Region': region,
                    'Content-type': 'application/json',
                },
            }
        );
        console.log('Response Data:', response.data);
        return response.data[0].translations[0].text;
    } catch (error) {
        console.error('Erro ao traduzir:', error);
        return text;
    }
}

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('pt-br');

    const toggleLanguage = () => {
        setCurrentLanguage(currentLanguage === 'pt-br' ? 'en' : 'pt-br');
    };

    const translate = async (text) => {
        if (currentLanguage === 'pt-br') {
            return text;
        } else {
            return await translateText(text, 'en');
        }
    };

    return (
        <LanguageContext.Provider value={{ currentLanguage, toggleLanguage, translate }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
