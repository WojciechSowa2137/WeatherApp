import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchData } from "../store/slices/searchSlice";
import { Button } from "@mui/material";

export default function Home() {
  const dispatch = useDispatch();
  function handleSet(value: string) {
    dispatch(setSearchData(value));
  }
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <>
      <div>
        <form action="">
          <input
            type="text"
            placeholder="lat lon or city name"
            onInput={(evt) =>
              setInputValue((evt.target as HTMLInputElement).value)
            }
          />
          <Link to="/search">
            <Button
              variant="contained"
              onClick={() => {
                handleSet(inputValue);
              }}
            >
              SEARCH
            </Button>
          </Link>
        </form>
      </div>
      <div>something</div>
      <div>MAP</div>
    </>
  );
}
