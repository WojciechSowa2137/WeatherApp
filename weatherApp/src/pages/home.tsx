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
  function handleSet(value: string) {
    dispatch(setSearchData(value));
  }

  interface mousePosition {
    lat: number;
    lng: number;
  }

  const [inputValue, setInputValue] = useState<string>("");
  const [position, setPosition] = useState<mousePosition>({ lat: 0, lng: 0 });

  function GetCoordinates() {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      map.on("click", (e) => {
        setPosition(e.latlng);
      });
    }, [map]);

    return null;
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
                placeholder="lat lon or city name"
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
        </MapContainer>
      </div>
    </>
  );
}
