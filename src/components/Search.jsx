import { ImSpinner6 } from "react-icons/im";
import "../styles/weatherApp.css";
import { useAppStore } from "../store/appStore";
import { DataWeather } from "./DataWeather";
import { fetchWeather } from "../shared/fetchService";

export const Search = () => {

  const { 
    city, 
    setCity, 
    fetchError, 
    setFetchError, 
    dataWeather, 
    setDataWeather,
    isLoadingData,
    setIsLoadingData
} = useAppStore((state) => state);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.length > 0) getWeather();
  };

  const getWeather = async () => {
    setIsLoadingData(true);
    try {
      const weather = await fetchWeather(city);
      if (weather?.cod === "404") {
        setFetchError(weather.message);
        setDataWeather(null);
      } else {
        setDataWeather(weather);
        setFetchError(null);
      }
      setIsLoadingData(false);
    } catch (error) {
      setFetchError(error.message);
      setIsLoadingData(false);
    }
  };

  return (
    <div className="container bg-gray-200">
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
      {dataWeather && <DataWeather dataWeather={dataWeather} />}
    </div>
  );
};
