import {ApiClient} from "@apis/base";

export const getChatsApi = (userID: string) => {
  return ApiClient.get(`user/${userID}/chats`);
};
