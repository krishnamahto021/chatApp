import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/homePage";
import ChatPage from "./pages/chatPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/chat", element: <ChatPage /> },
]);
