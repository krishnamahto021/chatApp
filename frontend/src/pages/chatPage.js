import UserContainer from "./userContainer";
import UserMessage from "./userMessage";

const ChatPage = () => {
  return (
    <>
      {/* <button onClick={() => dispatch(logOutUser())}>Log Out</button> */}
      <div className="chatPageContainer flex ">
        <UserContainer />
        <UserMessage />
      </div>
    </>
  );
};

export default ChatPage;
