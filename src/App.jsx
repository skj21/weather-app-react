import { useState } from "react";

function App () {
  const [city, setCity] = useState("");
  const [Weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if(!city) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }
   try {
    setError("");
  
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a31eda61d3b46d07edbaa923d629f1da`
    );
    
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    setWeather(data);
  } catch (err) {
    setError(err.message);
    setWeather(null);
  }
};
  return (
    <div className="app">
      <div className="weather-card">
      <h1>Weather App</h1>
      
      <div className="search-box">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

     {Weather && (
       <div className="weather-info">
        <h2>{Weather.name}</h2>
        <p>Temperature: {Weather.main.temp} °C</p>
        <p>Weather: {Weather.weather[0].main}</p>
        <p>Humidity: {Weather.main.humidity}%</p>
        <p>Wind Speed: {Weather.wind.speed} m/s</p>
      </div>
   )}
    </div>
    </div>
  )
}

export default App;