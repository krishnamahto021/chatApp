import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/homePage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/chat", element: <HomePage /> },
]);
