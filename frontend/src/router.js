import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage";
import ChatPage from "./pages/chatPage";
import { useSelector } from "react-redux"; // Import useSelector for Redux
import { userSelector } from "./redux/reducers/userReducer";

export const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector(userSelector);
  return isAuthenticated ? element : <Navigate to="/" />;
};

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/user/chat",
    element: <ProtectedRoute element={<ChatPage />} />, 
  },
]);
