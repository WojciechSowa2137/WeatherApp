import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setSearchData } from "../store/slices/searchSlice";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";

import { MapContainer, TileLayer, LayersControl } from "react-leaflet";

import Search from "../MUIComponents/Search";
import StyledInputBase from "../MUIComponents/StyledInputBase";
import GetCoordinates from "../mapComponents/GetCoordinates";

const { BaseLayer } = LayersControl;

export default function Home() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  function handleSet(value: string) {
    dispatch(setSearchData(value));
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Weather app
            </Typography>
            <Search>
              <StyledInputBase
                placeholder="[lat lon] or [city name]"
                inputProps={{ "aria-label": "search" }}
                onInput={(evt) =>
                  setInputValue((evt.target as HTMLInputElement).value)
                }
              />
            </Search>
            <Link to="/search">
              <IconButton
                aria-label="search"
                color="inherit"
                onClick={() => {
                  handleSet(inputValue);
                }}
              >
                <SearchIcon />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <div>
        <MapContainer
          center={[52, 21]}
          zoom={10}
          style={{ height: "calc(100vh - 80px)", width: "100%" }}
        >
          <LayersControl>
            <BaseLayer
              checked
              name="OpenStreetMap"
              children={undefined}
            ></BaseLayer>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <GetCoordinates handleSet={handleSet}/>
          </LayersControl>
        </MapContainer>
      </div>
    </>
  );
}
