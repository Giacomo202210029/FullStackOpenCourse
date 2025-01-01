import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const api_key = import.meta.env.VITE_SOME_KEY;
console.log('API Key:', import.meta.env.VITE_SOME_KEY);


console.log('API Key:', api_key); // Debugging line

if (!api_key) {
    console.warn('Warning: API key is missing. Climate data requests will fail.');
}

const getAll = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
};

const getClimate = (country) => {
    const capital = Array.isArray(country.capital) ? country.capital[0] : country.capital;
    if (!capital) {
        console.error('Error: Capital is missing for the specified country.');
        return Promise.reject('Capital is missing for the specified country.');
    }

    const request = axios.get(`https://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`);
    return request
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching climate data:', error);
            throw error;
        });
};


export default {
    getAll,
    getClimate,
};
