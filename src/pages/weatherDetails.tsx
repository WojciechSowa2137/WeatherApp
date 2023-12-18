import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import splitCord from "../functions/splitCord";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  CircularProgress,
} from "@mui/material";

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain?: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

async function getWeatherInfo(lat: string, lon: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    );
    if (!response.ok) {
      throw new Error("Something is wrong with WeatherDetails fetch");
    }
    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    throw new Error("Something is wrong with WeatherDetails fetch");
  }
}

function useWeatherInfo() {
  const [info, setInfo] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const { weatherId } = useParams<{ weatherId?: string }>();
  const cords = splitCord(weatherId || "");
  useEffect(() => {
    getWeatherInfo(cords[0], cords[1])
      .then((data) => {
        setInfo(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return { info, isError, isLoading };
}

export default function WeatherDetails() {
  const { info, isError, isLoading } = useWeatherInfo();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Weather App
            </Typography>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} color="white">
              {info?.name}
            </Typography>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                noWrap
                sx={{ flexGrow: 1 }}
                color="white"
              >
                HOME
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {isLoading && <CircularProgress style={{ fontSize: 50 }} />}
        {isError && <p style={{ fontSize: 50 }}>Something went wrong</p>}
        {!isLoading && !isError && (
          <div key={info?.id} style={{ textAlign: "center", fontSize: 30 }}>
            <Typography variant="body1">{info?.name}</Typography>
            <Typography variant="body1">{info?.main.temp}°C</Typography>
            <Typography variant="body1">
              {info?.weather[0].description}
            </Typography>
            <Typography variant="body1">
              {info?.main.temp_min}°C to {info?.main.temp_max}°C
            </Typography>
            <Typography variant="body1">
              Wind speed {info?.wind.speed}m/s
            </Typography>
          </div>
        )}
      </div>
    </>
  );
}
