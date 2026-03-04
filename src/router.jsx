import { createBrowserRouter } from "react-router-dom";
import { FilterPage } from "./Pages/FilterPage";
import { getRegions } from "./hook/getData";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FilterPage />,
    loader: getRegions,
  },
]);
