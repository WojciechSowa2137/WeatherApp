import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home";
import WeatherDetails from "../pages/weatherDetails";
import SearchOptions from "../pages/searchOptions";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },{
        path: "/weather",
        element: < WeatherDetails/>
    },
    {
      path: "/search",
      element: < SearchOptions/>
    },
  ]);
  
  function Router() {
    return <RouterProvider router={router} />;
  }
  
  export default Router;