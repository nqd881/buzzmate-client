import { useCookies } from "react-cookie";

export const useChatUserId = () => {
  const [cookies] = useCookies();

  return cookies?.["chat-user-id"] as string;
};
