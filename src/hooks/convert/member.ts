import { ApiChatMember } from "@apis/models/chat";
import { Member } from "src/models";

export const convertApiMember = (apiMember: ApiChatMember): Member => {
  return apiMember;
};
