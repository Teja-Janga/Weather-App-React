
import { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [favourites, setFavourites] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [theme, setTheme] = useState("dark");
    const [forecastList, setForecastList] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const isFavourite = weather && favourites.includes(weather.name);
    const debounceTimer = useRef(null);

    useEffect(() => {
        const savedCity = localStorage.getItem("weather-last-city");
        if (savedCity) {
            setCity(savedCity);
        }

        const savedFavourites = localStorage.getItem('weather-favourites');
        if (savedFavourites) {
            try {
                setFavourites(JSON.parse(savedFavourites));
            }
            catch {
                setFavourites([]);
            }
        }

        const savedTheme = localStorage.getItem("weather-theme");
        if (savedTheme === "light" || savedTheme === "dark") {
            setTheme(savedTheme);
        }
    }, []);

    const handleCityChange = (value) => {
        setCity(value);

        // If empty, clear suggestions  
        if (!value.trim()) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        // Debounce
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(async () => {
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(value)}&limit=5&appid=${API_KEY}`;
            try {
                const res = await fetch(url);
                if (!res.ok) return;
                const data = await res.json(); // array
                setSuggestions(data);
                setShowSuggestions(true);
            } 
            catch (e) {console.error(e); }
            
        }, 350);
    };

    const handleSelectSuggestion = (name) => {
        setCity(name);
        setSuggestions([]);
        setShowSuggestions(false);
        // handleSearch();
    };

    const updateFavourites = (next) => {
        setFavourites(next);
        localStorage.setItem('weather-favourites', JSON.stringify(next));
    };

    const handleToggleFavourite = () => {
        if (weather?.name) return;
        const cityName = weather.name;

        if (favourites.includes(cityName)) {
            updateFavourites(favourites.filter((c) => c !== cityName));
        } 
        else {
            updateFavourites([...favourites, cityName]);
        }
    };

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        localStorage.setItem("weather-theme", next);
    };
//================================== Live Location ====================================//
    const handleUseLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported in this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    setLoading(true);
                    setError("");
                    setWeather(null);
                    setForecast([]);

                    const url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
                    const res = await fetch(url);
                    if (!res.ok) {
                        throw new Error("Unable to fetch weather for your location.");
                    }
                    const data = await res.json();
                    setWeather(data);
                    setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
                    if (data.name) {
                        setCity(data.name);
                        localStorage.setItem("weather-last-city", data.name);
                    }

                    const forecastUrl = `${FORECAST_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
                    const forecastRes = await fetch(forecastUrl);
                    const forecastJson = await forecastRes.json();

                    if (!forecastRes.ok || !forecastJson.list) {
                        setForecast([]);
                        return;
                    }

                    setForecastList(forecastJson.list);
                    const daily = forecastJson.list.filter((item, index) => index % 8 === 0);
                    setForecast(daily);
                }
                catch (err) {
                    setError(err.message || "Something went wrong while using location.");
                }
                finally {
                    setLoading(false);
                }
            },
            (error) => {
                setError(error.message || "Unable to access your location.");
            }
        );
    };

//======================================================================================//
    const handleSearch = async () => {
        if (!city.trim()) return;
        setShowSuggestions(false);
        setSuggestions([]);
        try {
            setLoading(true);
            setError("");
            setWeather(null);
            setForecast([]);

            const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('City not found');
            }

            const data = await res.json();
            setWeather(data);
            setLastUpdated(new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit" }));

            localStorage.setItem("weather-last-city", city);
            // 2. 5-day / 3-hour forecast
            const forecastUrl = `${FORECAST_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
            const forecastRes = await fetch(forecastUrl);
            const forecastJson = await forecastRes.json();
            if (!forecastRes.ok || !forecastJson.list) {
                setForecast([]);                
                return;
            }
            setForecastList(forecastJson.list);
            const daily = forecastJson.list.filter((item, index) => index % 8 === 0);
            setForecast(daily);
        }
        catch (err) {
            setError(err.message || "Something went wrong!");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className={`app ${theme}`}>
            <div className="theme-toggle">
                <button onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === "dark" ? "🔆" : "🌙"}
                </button>
            </div>
            <h1 className="main-header">Weather App</h1>
            <SearchBar
                city={city}
                onCityChange={handleCityChange}
                onSearch={handleSearch}
                onUseLocation={handleUseLocation}
                disabled={loading}
                suggestions={suggestions}
                showSuggestions={showSuggestions}
                onSelectSuggestion={handleSelectSuggestion}
            />
            {loading && <div className="loader" aria-label="Loading" />}
            {error && <p className="error">{error}</p>}
            <CurrentWeather
                data = {weather}
                isFavourite={isFavourite}
                onToggleFavourite={handleToggleFavourite}
            /><hr/>
            <Forecast items={forecast} fullList={forecastList} theme={theme} />
            {lastUpdated && <p className="last-updated">Last updated at {lastUpdated}</p>}
            <p className="footer">
                Weather data from {" "}
                <a href="https://openweathermap.org" target="_blank" rel="noreferrer">
                    OpenWeather
                </a><br />
                Made by <b> Teja Janga </b>
            </p>
        </div>
    );
}

export default App

