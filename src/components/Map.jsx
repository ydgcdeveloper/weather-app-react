import mapboxgl from "mapbox-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppStore } from "../store/appStore";
import { fetchWeather } from "../shared/fetchService";
import 'mapbox-gl/dist/mapbox-gl.css'
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

  const addMarker = useCallback((markerLng, markerLat) => {
    const markerCoordinates = [markerLng, markerLat];
  
    if (!marker.current) {
      marker.current = new mapboxgl.Marker()
        .setLngLat(markerCoordinates)
        .addTo(map.current);
    } else {
      marker.current.setLngLat(markerCoordinates);
    }
    console.log('marker', marker);
  }, []);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("click", async (e) => {
      const clicLng = e.lngLat.lng;
      const clicLat = e.lngLat.lat;

      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${clicLng},${clicLat}.json?access_token=${access_token}`
        );

        if (response.ok) {
          const data = await response.json();
          const locationName = data?.features[2]?.place_name;

          if (!locationName) return;
          getWeatherFromMap(locationName);

          console.log('clic: ', clicLng, clicLat);
          addMarker(clicLng, clicLat);
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
