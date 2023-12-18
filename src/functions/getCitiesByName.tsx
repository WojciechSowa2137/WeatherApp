import { useState, useEffect } from "react";

interface City {
  name: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state: string;
}


async function getCitiesByName(city: string):Promise<City[]> {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${import.meta.env.VITE_API_KEY
      }`
    );
    if (!response.ok) {
      throw new Error("Something is wrong with Cities fetch");
    }
    const data: City[] = await response.json();
    return data;
  } catch (error) {
    throw new Error("Something is wrong with Cities fetch");
  }
}

interface CitiesByNameProps {
  cities: City[];
  isError: boolean;
  isLoading: boolean;
}

 export default function useCitiesByName(city: string): CitiesByNameProps {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
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

