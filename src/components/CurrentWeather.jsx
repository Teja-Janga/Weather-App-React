
function CurrentWeather({ data, isFavourite, onToggleFavourite }) {
    if (!data) return null;

    const { name, main, weather, wind, sys, visibility } = data;
    const temperature = Math.round(main.temp);
    const feelsLike = Math.round(main.feels_like);
    const minTemp = Math.round(main.temp_min);
    const maxTemp = Math.round(main.temp_max);
    const humidity = main.humidity;
    const pressure = main.pressure;
    const visKm = visibility != null ? (visibility / 1000).toFixed(1) : null;
    const windSpeed = wind?.speed;
    const condition = weather[0];
    const sunrise = sys?.sunrise ? new Date(sys.sunrise * 1000).toLocaleTimeString() : null;
    const sunset = sys?.sunset ? new Date(sys.sunset * 1000).toLocaleTimeString() : null;

    return (
        <div className="current-weather">
            <div className="current-header">
                <h2>{name}</h2>
                <button
                className={`fav-btn ${isFavourite ? "fav-btn--active" : ""}`}
                onClick={onToggleFavourite}
                aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"} 
                >{isFavourite ? "★" : "☆"}</button>
            </div>
            <p className="temp">{temperature}°C</p>
            <p className="desc">{condition.main} - {condition.description}</p>

            <div className="current-extra">
                <span>Feels like: {feelsLike}°C</span>
                <span>Min: {minTemp}°C &bull; Max: {maxTemp}°C</span>
            </div>
            <div className="current-grid">
                <div><strong>Humidity</strong><span>{humidity}%</span></div>
                <div><strong>Pressure</strong><span>{pressure} hPa</span></div>

                {visKm && (<div><strong>Visibility</strong><span>{visKm} km</span></div>)}
                {windSpeed !=null && (<div><strong>Wind</strong><span>{windSpeed} m/s</span></div>)}
                {sunrise && (<div><strong>Sunrise</strong><span>{sunrise}</span></div>)}
                {sunset && (<div><strong>Sunset</strong><span>{sunset}</span></div>)}
            </div>
        </div>
    );
}
export default CurrentWeather


