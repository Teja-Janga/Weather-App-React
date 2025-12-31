import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"; 
import 'leaflet/dist/leaflet.css';
import { useEffect } from "react";

function ChangeView({ center }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 10);
    }, [center, map]);
    return null;
}

function WeatherMap({ lat, lon, city, Apikey }) {
    if (!lat || !lon) return null;

    const position = [lat, lon];

    return (
        <div className="map-wrapper" style={{ height: '300px', width: '100%',
            marginTop: '20px', borderRadius: '15px', overflow: 'hidden'
        }}>
            <MapContainer center={position} zoom={10} scrollWheelZoom={false}
                style={{ height: '100%', width: '100%'
            }}>
                <ChangeView center={position} />
                <TileLayer
                    attribution='&copy;
                    <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                <TileLayer
                    url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${Apikey}`}
                    attribution='&copy; <a href="https://openweathermap.org/">OpenWeather</a>'
                />
                <Marker position={position}>
                    <Popup>
                        {city} is here! 📍
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
export default WeatherMap