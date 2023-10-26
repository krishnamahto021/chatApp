import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage";
import ChatPage from "./pages/chatPage";
import { useSelector } from "react-redux"; // Import useSelector for Redux
import { userSelector } from "./redux/reducers/userReducer";

export const ProtectedRouteChat = ({ element }) => {
  const { initialUser } = useSelector(userSelector);
  return initialUser.token ? element : <Navigate to="/" />;
};

export const ProtectedRoute = ({ element }) => {
  const { initialUser } = useSelector(userSelector);
  return initialUser.token ? <Navigate to="/user/chat" /> : element;
};

export const router = createBrowserRouter([
  { path: "/", element: <ProtectedRoute element={<HomePage />} /> },
  {
    path: "/user/chat",
    element: <ProtectedRouteChat element={<ChatPage />} />,
  },
]);
