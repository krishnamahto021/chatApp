import { useSelector } from "react-redux";
import NavBar from "../components/navBar";
import UserContainer from "./userContainer";
import UserMessage from "./userMessage";
import { userSelector } from "../redux/reducers/userReducer";
import UserProfile from "../components/userProfile";

const ChatPage = () => {
  const { showProfile } = useSelector(userSelector);
  return (
    <>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen  ">
        <NavBar />
        <div className="chatContainer flex ">
          <UserContainer />
          <UserMessage />
          {showProfile ? <UserProfile /> : null}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
