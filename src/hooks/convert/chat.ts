import { ApiChat } from "@apis/models/chat";
import { Chat } from "src/models";

export const convertApiChat = (apiChat: ApiChat): Chat => {
  return {
    id: apiChat.id,
    title: apiChat.title,
    description: apiChat.description,
    messages: [],
    members: [],
    medias: [],
  };
};
