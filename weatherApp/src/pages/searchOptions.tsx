import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useCitiesByName from "../functions/getCitiesByName";
import hasNumbers from "../functions/checkInputValue";
import { Link, useNavigate } from "react-router-dom";
const SearchOptions: React.FC = () => {
  const inputValue = useSelector((state: RootState) => state.search.data);
  if (!hasNumbers(inputValue)) {
    const { cities, isError, isLoading } = useCitiesByName(inputValue);
    return (
      <>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Wersja robacza trza zmienić Error</p>}
        {!isLoading &&
          !isError &&
          cities.map((city, index) => (
            <div key={index}>
              <Link to={`/search/${city.lat + "kkk" + city.lon}`}>
                <span>{city.name}</span>
              </Link>
            </div>
          ))}
      </>
    );
  } else {
    const navigate = useNavigate();
    const cord = inputValue.split(" ");
    useEffect(() => {
      navigate(`/search/${cord[0] + "kkk" + cord[1]}`);
    });
  }
};

export default SearchOptions;
