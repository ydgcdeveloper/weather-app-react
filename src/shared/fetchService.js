export const fetchWeather = async (city) => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "9e717466b972ac6ebaedad1f684a0edd";
  let data = null;
  
  try {
    const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`);
    data = await response.json();
  } catch (error) {
    return Error(error);
  }
  return data;
};
