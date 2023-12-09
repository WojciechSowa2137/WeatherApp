import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const SearchOptions: React.FC = () => {
  console.log("dziala przed");
  const inputValue = useSelector((state: RootState) => state.search.data);
  console.log("dziala po");
  console.log(inputValue);
  return (
    <>
      <span>Cos</span>
    </>
  );
};

export default SearchOptions;
