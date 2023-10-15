import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/homePage";
import SignUp from "./pages/signUp";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/chat", element: <HomePage /> },
  { path: "/user/sign-up", element: <SignUp /> },
]);
