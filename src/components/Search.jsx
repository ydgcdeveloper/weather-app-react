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
    setIsLoadingData,
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
    <div className="flex flex-col flex-1 p-5 bg-gray-200">
      <form className="flex mb-5" onSubmit={handleSubmit}>
        <input
          className="flex-1 p-3 rounded-md border border-gray-300 lg:text-base sm:text-sm"
          type="text"
          placeholder="Write a city name"
          value={city}
          onChange={handleCityChange}
        />
        <button
          type="submit"
          className="flex items-center rounded-md bg-blue-600 hover:bg-blue-700 p-2 text-white ml-1"
        >
          Search
          <ImSpinner6
            visibility={isLoadingData ? "visble" : "hidden"}
            className="spinner rotate"
          ></ImSpinner6>
        </button>
      </form>
      {fetchError && (
        <h1 className="text-center text-red-600 font-bold text-2xl capitalize">
          {fetchError}
        </h1>
      )}
      {/* {!dataWeather && <div className="h-[50vh]"></div>} */}
      {dataWeather && <DataWeather dataWeather={dataWeather} />}
    </div>
  );
};
