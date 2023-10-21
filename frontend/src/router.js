import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage";
import ChatPage from "./pages/chatPage";
import { useSelector } from "react-redux"; // Import useSelector for Redux
import { userSelector } from "./redux/reducers/userReducer";

export const ProtectedRouteChat = ({ element }) => {
  const isAuthenticated = useSelector(userSelector);
  return isAuthenticated ? element : <Navigate to="/" />;
};

export const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector(userSelector);
  return isAuthenticated ? <Navigate to="/user/chat" /> : element;
};

export const router = createBrowserRouter([
  { path: "/", element: <ProtectedRoute element={<HomePage />} /> },
  {
    path: "/user/chat",
    element: <ProtectedRouteChat element={<ChatPage />} />,
  },
]);
