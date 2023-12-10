import { useState, useEffect } from "react";

async function getCitiesByName(city: string) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${import.meta.env.VITE_API_KEY
      }`
    );
    if (!response.ok) {
      throw new Error("Something is wrong with WeatherDetails fetch");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Something is wrong with WeatherDetails fetch");
  }
}

 export default function useCitiesByName(city: string) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    getCitiesByName(city)
      .then((data) => {
        setCities(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return { cities, isError, isLoading };
}

