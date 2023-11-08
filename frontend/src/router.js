import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage";
import ChatPage from "./pages/chatPage";
import VerifyUserPage from "./pages/verifyUserPage";
import { useSelector } from "react-redux"; // Import useSelector for Redux
import { userSelector } from "./redux/reducers/userReducer";
import ResetPasswordPage from "./pages/resetPasswordPage";
import ForgottenPasswordPage from "./pages/forgottenPasswordPage";

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
    path: "/user/verify-user/:token",
    element: <VerifyUserPage />,
  },
  {
    path: "/user/forgotten-password",
    element: <ForgottenPasswordPage />,
  },
  {
    path: "/user/reset-password/:token",
    element: <ResetPasswordPage />,
  },
  {
    path: "/user/chat",
    element: <ProtectedRouteChat element={<ChatPage />} />,
  },
]);
