import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../store/appStore";
import { fetchWeather } from "../shared/fetchService";
const access_token =
  "pk.eyJ1IjoieWRnY2RldmVsb3BlciIsImEiOiJja3lkZTEwY24wMTgwMzBtdG9xcTgyOW54In0.jNT6jyPxIBUG3iMjD9Rtdg";
mapboxgl.accessToken = access_token;

export const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const { 
    setCity, 
    setFetchError, 
    setDataWeather,
    setIsLoadingData
} = useAppStore((state) => state);

const getWeatherFromMap = async (place) => {
    setIsLoadingData(true);
    setCity(place)
    try {
      const weather = await fetchWeather(place);
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

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add a click event listener to the map
    map.current.on("click", (e) => {
      // Get the geographical coordinates of the point where the user clicked
      const { lng, lat } = e.lngLat;

      // Use Mapbox Geocoding API to get the location name based on the coordinates
      // Replace 'your_access_token' with your actual Mapbox access token
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${access_token}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Extract the location name from the API response
          const locationName = data.features[2].place_name;

          // Log or do something with the location name
          console.log("Location Name:", locationName, data);
          getWeatherFromMap(locationName);
        })
        .catch((error) => {
          console.error("Error fetching location information:", error);
        });
      console.log("Click", lng, lat);
    });
  });

  const resizeHandler = () => {
    if (map.current) {
      map.current.resize();
    }
  };

  window.addEventListener("resize", resizeHandler);

  return (
    <div className="flex flex-col flex-1 gap-2 h-max bg-gray-200">
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: "97%" }}
      />
    </div>
  );
};
