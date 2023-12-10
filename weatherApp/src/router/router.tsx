import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home";
import WeatherDetails from "../pages/weatherDetails";
import SearchOptions from "../pages/searchOptions";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
      path: "/search",
      element: < SearchOptions/>,
      children: [],
    },
    {
      path: "/search/:weatherId",
      element: < WeatherDetails/>
    }
  ]);
  
  function Router() {
    return <RouterProvider router={router} />;
  }
  
  export default Router;