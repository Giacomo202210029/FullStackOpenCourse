

import {useEffect, useState} from "react";
import CountryService from "./services/CountryService.js";

const App = () => {
    const [search, setSearch] = useState('')

    const [weather, setWeather] = useState(null)

    const [allCountries, setAllCountries] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        CountryService.getAll().then(data => {
            setAllCountries(data);
            setCountries(data);
        });
    }, []);

    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        setSearch(searchValue);

        const filteredCountries = allCountries.filter(country =>
            country.name.common.toLowerCase().includes(searchValue.toLowerCase())
        );

        setCountries(filteredCountries);

        if (filteredCountries.length === 1) {
            const country = filteredCountries[0];
            if (country.capital) {
                CountryService.getClimate(country)
                    .then(data => setWeather(data))
                    .catch(error => console.error('Error fetching weather data:', error));
            } else {
                console.error('Error: Selected country has no capital.');
            }
        } else {
            setWeather(null);
        }
    };




    const hookclimate = () => {
        if (countries.length === 1) {
            const country = countries[0];
            if (country.capital) {
                console.log('effect');
                CountryService.getClimate(country)
                    .then(data => {
                        console.log('Weather data received:', data);
                        setWeather(data);
                    })
                    .catch(error => console.error('Error fetching weather data:', error));
            } else {
                console.error('Error: Country does not have a capital.');
            }
        }
    };


    useEffect(hookclimate, [countries])



    return (
        <div>
            <CountryInput search={search} handleSearchChange={handleSearchChange}></CountryInput>
            <CountryList countries={countries} setCountries={setCountries} weather={weather}></CountryList>
        </div>
    )
}


const CountryInput = ({search, handleSearchChange}) => {
    return (
        <div>
                <input
                    value={search}
                    onChange={handleSearchChange}
                />
        </div>
    )
}

const CountryCard = ({country, weather}) => {
    return (
        <div key={country.id}>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h3>languages</h3>
            <div>
                {country.languages && typeof country.languages === 'object' ? Object.values(country.languages).map(language => (
                    <div key={language}>{language}</div>
                )) : null}
            </div>
            <div>
                <img src={country.flags.png} alt={country.name.common} width="100" height="100"/>
            </div>
            <h3>Climate in {country.capital}</h3>
            {weather && weather.current ? (
                <div>
                    <div>temperature: {weather.current.temperature} Celsius</div>
                    <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} width="100" height="100" />
                    <div>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
                </div>
            ) : (
                <div>Loading weather data...</div>
            )}
        </div>
    )
}

const CountryList = ({countries, setCountries, weather}) => {
    if (countries.length > 1 && countries.length < 10) {
        return (
            <div>
                <ul>
                    {countries.map(country => (
                        <div key={country.name.common}>
                            {country.name.common}
                            <button onClick={() => setCountries([country])}>show</button>
                        </div>
                    ))}
                </ul>
            </div>
        );
    } else if (countries.length === 1) {
        return (
            <div>
                <ul>
                    {countries.map(country => (
                        <CountryCard key={country.name.common} country={country} weather={weather}/>
                    ))}
                </ul>
            </div>
        );
    } else if (countries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        );
    } else {
        return null; // Maneja el caso donde no hay países
    }
};



export default App
