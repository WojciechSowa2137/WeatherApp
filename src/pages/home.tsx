import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchData } from "../store/slices/searchSlice";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import L from "leaflet";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 2),
    transition: theme.transitions.create("width"),
  },
}));

export default function Home() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");

  function handleSet(value: string) {
    dispatch(setSearchData(value));
  }

  interface mousePosition {
    lat: number;
    lng: number;
  }

  function GetCoordinates() {
    const map = useMap();
    const [position, setPosition] = useState<mousePosition | null>(null);

    useEffect(() => {
      if (!map) return;

      const info = L.DomUtil.create("div", "legend");

      const PositionControl = L.Control.extend({
        options: {
          position: "bottomleft",
        },

        onAdd: function () {
          info.textContent = "Click on the map";
          return info;
        },
      });

      const positionControl = new PositionControl();
      positionControl.addTo(map);

      const handleMapClick = (e: any) => {
        const { lat, lng } = e.latlng;
        setPosition(e.latlng);
        info.textContent = `${lat}, ${lng}`;
        console.log(e);
      };

      map.on("click", handleMapClick);

      return () => {
        map.off("click", handleMapClick);
        map.removeControl(positionControl);
      };
    }, [map]);

    return position ? (
      <Marker position={position}>
        <Popup>
          <Link to="/search">
            <Button
              onClick={() => {
                handleSet(`${position.lat} ${position.lng}`);
              }}
            >
              GET
            </Button>
          </Link>
        </Popup>
      </Marker>
    ) : null;
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
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GetCoordinates />
        </MapContainer>
      </div>
    </>
  );
}
