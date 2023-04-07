import {ApiClient} from "@apis/base";
import {ApiChat} from "@apis/models/chat";

export const getAllChatsApi = () => {
  return ApiClient.get<ApiChat[], ApiChat[]>("/api/chat-svc/chats");
};
