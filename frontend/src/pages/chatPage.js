import NavBar from "../components/navBar";
import UserContainer from "./userContainer";
import UserMessage from "./userMessage";

const ChatPage = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen ">
        <NavBar />
        <div className="chatContainer flex  ">
          <UserContainer />
          <UserMessage />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
