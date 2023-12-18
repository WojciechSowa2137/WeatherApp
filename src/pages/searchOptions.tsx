import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useCitiesByName from "../functions/getCitiesByName";
import hasNumbers from "../functions/checkInputValue";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const SearchOptions: React.FC = () => {
  const inputValue = useSelector((state: RootState) => state.search.data);

  if (!hasNumbers(inputValue)) {
    const { cities, isError, isLoading } = useCitiesByName(inputValue);

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
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                color="white"
              >
                {inputValue}
              </Typography>
              <Link to="/">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                  color="white"
                >
                  HOME
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>

        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong</p>}
        {cities.length === 0 && !isLoading && !isError && (
          <p>No matching location found</p>
        )}

        {!isLoading && !isError && cities.length > 0 && (
          <List
            sx={{
              bgcolor: "background.paper",
              margin: "auto",
              width: "20%",
              padding: "10px",
              fontSize: "1.2em",
              marginTop: "20%",
              marginBottom: "10%",
            }}
            component="nav"
            aria-label="mailbox folders"
          >
            {cities.map((city, index) => (
              <div key={index}>
                <Link to={`/search/${city.lat + "kkk" + city.lon}`}>
                  <ListItem button>
                    <ListItemText primary={city.name} />
                  </ListItem>
                </Link>
              </div>
            ))}
          </List>
        )}
      </>
    );
  } else {
    const navigate = useNavigate();
    const cord = inputValue.split(" ");

    useEffect(() => {
      navigate(`/search/${cord[0] + "kkk" + cord[1]}`);
    }, [inputValue]);

    return null;
  }
};

export default SearchOptions;
