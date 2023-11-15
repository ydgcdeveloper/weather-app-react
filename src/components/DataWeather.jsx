import PropTypes from "prop-types";

export const DataWeather = ({ dataWeather }) => {
  const diffKelvin = 273.15;
  return (
    <div className="flex flex-col justify-start">
      <h1 className="text-center text-3xl mb-1">{dataWeather?.name}</h1>
      <div className="text-xl">
        <p>
          <span className="font-semibold">Temperature:</span>{" "}
          {parseInt(dataWeather?.main?.temp - diffKelvin)}°C
        </p>
        <p>
          <span className="font-semibold">Humidity:</span>{" "}
          {dataWeather?.main?.humidity}%
        </p>
        <p>
          <span className="font-semibold">Wind speed:</span>{" "}
          {dataWeather?.wind.speed}m/s
        </p>
        <p>
          <span className="font-semibold">Weather condition:</span>{" "}
          <span className="capitalize">{dataWeather?.weather[0]?.description}</span>
        </p>
      </div>
      <div className="flex flox-col justify-center">
        <img
          className="w-[200px] h-[200px]"
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
