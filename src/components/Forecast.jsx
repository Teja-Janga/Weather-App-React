import { useEffect, useState } from "react";
import TemperatureChart from "./TemperatureChart";

function Forecast({ items, fullList, theme }) {
    
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (items && items.length > 0) {
            setSelectedDate(new Date(items[0].dt * 1000).toDateString());
        }
    }, [items]);

    if (!items || items.length === 0) return null;

    const hourlyData = fullList ?
    fullList.filter((item) => {
        const itemDate = new Date(item.dt * 1000).toDateString();
        return itemDate === selectedDate;
    }) : [];

    return (
        <div className="forecast">
            <h2>5-Day Forecast</h2>
            <div className="forecast-grid">
                {items.map((item, index) => {
                    const date = new Date(item.dt * 1000);
                    const dateString = date.toDateString();
                    const day = date.toLocaleDateString("en-US", { weekday: "long" });
                    const temp = Math.round(item.main.temp);
                    const icon = item.weather[0].icon;
                    const description = item.weather[0].description;
                    const isSelected = dateString === selectedDate;

                    return (
                        <div
                            key={index}
                            className={`forecast-card ${isSelected ? "selected" : ""}`}
                            onClick={() => setSelectedDate(dateString)}
                            style={{ cursor: "pointer" }}
                        >
                            <p>{day}</p>
                            <img
                                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                                alt={description}
                            />
                            <p>{temp}°C</p>
                            <p>{description}</p>
                        </div>
                    );
                })}
            </div>
            {hourlyData.length > 0 && (
                <div className="hourly-section">
                    <h3>Hourly Forecast for {selectedDate}</h3>
                    <TemperatureChart data = {hourlyData} theme={theme} />
                    <div className="hourly-grid">
                        {hourlyData.map((item, idx) => (
                            <div key={idx} className="hourly-card">
                                <p>
                                    {new Date(item.dt * 1000).toLocaleTimeString([],{
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                                <img
                                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                    alt={item.weather[0].description}
                                />
                                <p>{Math.round(item.main.temp)}°C</p>
                                <p>{item.weather[0].description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Forecast;
