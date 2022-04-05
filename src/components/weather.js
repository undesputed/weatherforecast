import '../assets/weather.css';
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

import Weather from './weatherComponents/weather';
import { AuthContext } from '../App';
import { Redirect } from 'react-router-dom';

export default function WeatherPage() {
  const {state, dispatch} = useContext(AuthContext);

  const location = useLocation();

  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
      getWeather(location.state.lat, location.state.long);

  })

  if(!state.isLoggedIn) {
      return <Redirect to="/landing" />;
  }

  function handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Please Enable your Location in your browser!");
    }
  }

  function getWeather(lat, long) {
    return fetch(
      `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&APPID=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => handleResponse(res))
      .then(weather => {
        if (Object.entries(weather).length) {
          const mappedData = mapDataToWeatherInterface(weather);

          setWeatherData(mappedData);
        }
      });
  }
  function mapDataToWeatherInterface(data) {
    const mapped = {
      date: data.dt * 1000, // convert from seconds to milliseconds
      description: data.weather[0].description,
      temperature: Math.round(data.main.temp),
      main: data.weather[0].main,
      pressure: data.main.pressure,
      humidity: data.main.humidity
    };
  
    // Add extra properties for the five day forecast: dt_txt, icon, min, max
    if (data.dt_txt) {
      mapped.dt_txt = data.dt_txt;
    }
  
    return mapped;
  }
  
  const handleLogout = () => {
    dispatch({
    type: "LOGOUT"
    });
} 

  return (
    <div className="weather">
      <button className="logout" onClick={() => handleLogout()}>Logout</button>
        <Weather weatherData={weatherData}/>
    </div>
  );
}
