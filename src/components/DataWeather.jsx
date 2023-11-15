import PropTypes from "prop-types";

export const DataWeather = ({ dataWeather }) => {
  const diffKelvin = 273.15;
  return (
    <div>
      <div>
        <h2>{dataWeather?.name}</h2>
        <p>Temperature: {parseInt(dataWeather?.main?.temp - diffKelvin)}°C</p>
        <p>Weather condition: {dataWeather?.weather[0]?.description}</p>
        <img
          src={`https://openweathermap.org/img/wn/${dataWeather?.weather[0]?.icon}@4x.png`}
          alt="icon"
        />
      </div>
    </div>
  );
};

DataWeather.propTypes = {
  dataWeather: PropTypes.object.isRequired,
};
