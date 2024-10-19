import { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search from "../assets/search.png";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import axios from "axios";

function Weather() {
  const [weatherData, setWeatherData] = useState(0);

  const inputRef = useRef();

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const searchh = async (city) => {
    if (city === "") {
      alert("Enter the right city name");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_APP_ID
        }`
      );

      // if(!response.ok){
      //   alert(data.message);
      //   return;
      // }

      console.log(response.data);

      const icon = allIcons[response.data.weather[0].icon] || clear;

      setWeatherData({
        humidity: response.data.main.humidity,
        wind: Math.floor(response.data.wind.speed),
        temperature: Math.floor(response.data.main.temp),
        location: response.data.name,
        icon: icon,
        country : response.data.sys.country
        
      });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setWeatherData(0);
      console.error("You have a problem in fetch");
    }
  };

  useEffect(() => {
    searchh("Ankara");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="search" />
        <img
          src={search}
          alt=""
          onClick={() => searchh(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img className="weather-icon" src={weatherData.icon} alt="" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          
          <div className="weather-data">
            <div className="col">
              <img src={humidity} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="" />
              <div>
                <p>{weatherData.wind} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
            <div className="col">{weatherData.country}</div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Weather;
