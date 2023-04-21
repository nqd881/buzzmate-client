export const KEY_LIST_CHATS = ["chats"];

export const KEY_LIST_USERS_SEARCH = ["search", "users"];

export const KEY_LIST_MESSAGES_OF_CHAT = (chatId: string) => [
  "chats",
  chatId,
  "messages",
];

export const KEY_LIST_DRAFT_MESSAGES_OF_CHAT = (chatId: string) => [
  "chats",
  chatId,
  "draft_messages",
];

export const KEY_LIST_MEMBERS_OF_CHAT = (chatId: string) => [
  "chats",
  chatId,
  "members",
];
