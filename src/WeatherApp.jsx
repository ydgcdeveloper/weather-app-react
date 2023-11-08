import { useState } from "react";
import "./styles/weatherApp.css";
import { ImSpinner6 } from "react-icons/im";

export const WeatherApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "9e717466b972ac6ebaedad1f684a0edd";
  const diffKelvin = 273.15;

  const [city, setCity] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [dataWeather, setDataWeather] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.length > 0) fetchWeather();
  };

  const fetchWeather = async () => {
    setIsLoadingData(true);
    try {
      const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`);
      const data = await response.json();
      if (data?.cod === "404") {
        setFetchError(data.message);
        setDataWeather(null);
      } else {
        setDataWeather(data);
        setFetchError(null);
      }
      setIsLoadingData(false);
    } catch (error) {
      setFetchError(error.message);
      setIsLoadingData(false);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a city name"
          value={city}
          onChange={handleCityChange}
        />
        <button type="submit">
          Search
          <ImSpinner6
            visibility={isLoadingData ? "visble" : "hidden"}
            className="spinner rotate"
          ></ImSpinner6>
        </button>
      </form>
      {fetchError && <h1 className="error">{fetchError}</h1>}
      {dataWeather && (
        <div>
          <h2>{dataWeather?.name}</h2>
          <p>Temperature: {parseInt(dataWeather?.main?.temp - diffKelvin)}°C</p>
          <p>Weather condition: {dataWeather?.weather[0]?.description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${dataWeather?.weather[0]?.icon}@4x.png`}
            alt="icon"
          />
        </div>
      )}
    </div>
  );
};
