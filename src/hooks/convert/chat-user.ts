import { ApiChatUser } from "@apis/models/chat";
import { ChatUser } from "src/models";

export const convertApiChatUser = (apiChatUser: ApiChatUser): ChatUser => {
  return apiChatUser;
};
