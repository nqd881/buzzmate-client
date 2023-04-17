import { ApiClient } from "@apis/base";
import { ApiChatUser } from "@apis/models/chat";

export type GetUsersOptions = {
  limit?: number;
  ids?: string[];
  emails?: string[];
  names?: string[];
};

export const getUsersApi = (options?: GetUsersOptions) => {
  const queries = new URLSearchParams();

  const { limit, ids, emails, names } = options;

  if (limit) queries.append("limit", limit.toString());

  if (ids) ids.forEach((id) => queries.append("id", id));
  if (emails) emails.forEach((email) => queries.append("email", email));
  if (names) names.forEach((name) => queries.append("name", name));

  return ApiClient.get<ApiChatUser[], ApiChatUser[]>(
    `/api/chat-svc/users?${queries}`
  );
};
