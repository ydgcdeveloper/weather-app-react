import mapboxgl from "mapbox-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppStore } from "../store/appStore";
import { fetchWeather } from "../shared/fetchService";
const access_token =
  "pk.eyJ1IjoieWRnY2RldmVsb3BlciIsImEiOiJja3lkZTEwY24wMTgwMzBtdG9xcTgyOW54In0.jNT6jyPxIBUG3iMjD9Rtdg";
mapboxgl.accessToken = access_token;

export const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  const [lng, setLng] = useState(-83.29);
  const [lat, setLat] = useState(15.027);
  const [zoom, setZoom] = useState(9);

  const { setCity, setFetchError, setDataWeather, setIsLoadingData } =
    useAppStore((state) => state);

  const getWeatherFromMap = useCallback(async (place) => {
    setIsLoadingData(true);
    setCity(place);
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
  }, [setIsLoadingData, setCity, setFetchError, setDataWeather]);

  const addMarker = useCallback((lng, lat) => {
    lng = lng.toFixed(2)
    lat = lat.toFixed(2)
    if (!marker.current) {
      marker.current = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current);
    } else {
      marker.current.setLngLat([lng, lat]);
    }
  }, []);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("click", async (e) => {
      const { lng, lat } = e.lngLat;

      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${access_token}`
        );

        if (response.ok) {
          const data = await response.json();
          const locationName = data?.features[2]?.place_name;

          if (!locationName) return;
          getWeatherFromMap(locationName);

          addMarker(lng, lat);
        } else {
          throw new Error("Network request failed");
        }
      } catch (error) {
        // console.error("Error fetching location information:", error);
      }
    });
  }, [addMarker, getWeatherFromMap, lng, lat, zoom]);

  const resizeHandler = useCallback(() => {
    if (map.current) {
      map.current.resize();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [resizeHandler]);

  return (
    <div className="flex flex-col flex-1 gap-2 h-max bg-gray-200">
      <div className="py-1 px-3 z-10 absolute mt-3 right-3 rounded-md font-mono bg-slate-700 text-yellow-50">
        <span>Longitude: {lng}</span> | <span>Latitude: {lat}</span> |{" "} <span>Zoom: {zoom}</span>
      </div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: "97%" }}
      />
    </div>
  );
};
