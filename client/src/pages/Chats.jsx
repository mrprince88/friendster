import { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import { CometChatUI } from "../CometChatWorkspace/src";
import { AuthContext } from "../context/AuthContext";
import { CometChat } from "@cometchat-pro/chat";

export default function Chats() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      CometChat.login(user._id, process.env.REACT_APP_CHAT_AUTH_KEY).then(
        (user) => {
          console.log("Login Successful:", { user });
          setIsLoading(false);
        },
        (error) => {
          console.log("Login failed with exception:", { error });
        }
      );
    }
  });
  return (
    <>
      <Header />
      {!isLoading && (
        <>
          <div style={{ width: "100%", height: "94vh" }}>
            <CometChatUI />
          </div>
        </>
      )}
    </>
  );
}
