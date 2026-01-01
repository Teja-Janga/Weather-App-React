# Weather App

## 🌤️ Live Demo

👉 **[View Live Demo](https://weather-app-react-psi-weld.vercel.app/)**

## Overview

Weather App is a responsive web application built with React and Vite that provides real-time weather data, hourly forecasts, and a 5-day weather outlook. The app features an interactive hourly temperature chart, geolocation support, theme toggle, and favorite location bookmarking.

## Features

✨ **Core Features:**

* 🔍 Search weather by city name with autocomplete suggestions
* 📍 Geolocation support - Get weather for your current location
* 🌡️ Real-time current weather data (temperature, humidity, pressure, wind speed, etc.)
* ⭐ Add/remove cities from favorites with persistent storage
* 📊 Interactive hourly temperature chart using Recharts
* 📅 5-day and hourly weather forecast
* 🌙 Dark/Light theme toggle
* 📱 Fully responsive design (mobile, tablet, desktop)
* ⚡ Fast performance with Vite and React
* 🎨 Clean and intuitive UI with smooth animations
* 💾 Persistent favorites using browser localStorage
* ⏳ Loading states and error handling
* 🌐 Real-time weather data from OpenWeather API
* 🗺️ Interactive Weather Map - View real-time precipitation and temperature layers using Leaflet

## Tech Stack

* **Frontend Framework:** React 18
* **Build Tool:** Vite
* **Styling:** CSS (Custom with Flexbox/Grid)
* **Charts:** Recharts
* **Maps:** Leaflet & React-Leaflet
* **API:** OpenWeather API
* **Storage:** Browser LocalStorage
* **Deployment:** Vercel

## Project Structure

```
Weather-App-React/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── CurrentWeather.jsx
│   │   ├── Forecast.jsx
│   │   ├── TemperatureChart.jsx
│   │   └── WeatherMap.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
│   └── vite.svg
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

## Usage

1. **Search Cities:** Type a city name in the search bar to see autocomplete suggestions
2. **View Weather:** Click on a suggested city to fetch its weather data
3. **Use Location:** Click the location icon to get weather for your current location
4. **Add Favorites:** Click the star icon to save cities for quick access
5. **View Forecast:** Check the 5-day forecast and hourly temperature trends
6. **Toggle Theme:** Switch between dark and light modes using the theme button
7. **Browse Hourly:** Click on a forecast day to see hourly breakdowns with an interactive chart

## Features in Detail

### Current Weather
* Real-time temperature, "feels like", min/max values
* Weather condition description with emoji indicator
* Humidity, pressure, visibility, and wind speed
* Sunrise and sunset times
* Favorite toggle button for quick bookmarking

### 5-Day Forecast
* Daily weather overview with date, temperature, and conditions
* High-quality weather icons
* Click any day to see detailed hourly forecast
* Selected day highlighting

### Hourly Forecast
* Interactive line chart showing temperature trends
* Detailed hourly data in a horizontal scrollable grid
* Precise time stamps and weather conditions
* Dynamic theme-aware chart colors

### Interactive Weather Map
* Dynamic terrain map with smooth zooming
* Real-time weather overlays (Precipitation and Temperature)
* Smooth view transitions when searching for new cities

### Themes
* Dark mode (default) - Easy on the eyes with blue gradient background
* Light mode - Clean and bright interface
* Persistent theme preference using localStorage

### Geolocation
* One-click weather access using browser geolocation
* Automatic location detection on first visit
* Error handling for denied permissions

## Deployment

The app is deployed on **Vercel**.

1. Push code to GitHub main branch
2. Vercel automatically detects changes
3. App rebuilds and deploys within seconds
4. Environment variables are securely managed in Vercel dashboard

## Future Enhancements

* 🎯 Weather alerts and notifications
* 📊 Historical weather data and trends
* 🌍 Support for multiple languages
* 📈 Air quality index (AQI) information
* ⚙️ Customizable temperature units (°C/°F)
* 🔔 Push notifications for weather changes
* 📤 Share weather with others

## License

This project is open source and available under the MIT License.

## Author

**Teja Janga**

* GitHub: [@Teja-Janga](https://github.com/Teja-Janga)
* Live Demo: [weather-app-react-psi-weld.vercel.app](https://weather-app-react-psi-weld.vercel.app/)

## Acknowledgments

* [OpenWeather API](https://openweathermap.org/) for real-time weather data
* Font Awesome for weather icons

**Made by Teja Janga**
