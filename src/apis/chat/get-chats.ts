import { ApiClient } from "@apis/base";
import { ApiChat } from "@apis/models/chat";

export const getChatsApi = () => {
  return ApiClient.get<ApiChat[], ApiChat[]>("/api/chat-svc/chats");
};
