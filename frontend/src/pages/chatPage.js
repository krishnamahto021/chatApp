import { useDispatch } from "react-redux";
import { logOutUser } from "../redux/reducers/userReducer";

const ChatPage = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => dispatch(logOutUser())}>Log Out</button>
    </>
  );
};

export default ChatPage;
