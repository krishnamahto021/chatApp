import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/homePage";
import { ChakraProvider } from "@chakra-ui/react";
import ChatPage from "./pages/chatPage";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/api/chats", element: <ChatPage /> },
  ]);
  return (
    <>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </>
  );
}

export default App;
