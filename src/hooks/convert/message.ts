import { ApiMessage } from "@apis/models/chat";
import { Message } from "src/models";

export const convertApiMessage = (message: ApiMessage): Message => {
  if (!message) return null;

  const {
    id,
    chatId,
    content,
    date,
    editDate,
    replyToMessageId,
    senderUserId,
  } = message;

  return {
    id,
    chatId,
    content: {
      text: content?.text,
      photos: content?.photoIds?.map((photoId) => ({
        id: photoId,
        isLocal: false,
        localUri: null,
        remoteUri: `http://buzzmate.com/api/chat-svc/chats/${chatId}/photos/${photoId}/original`,
        isSending: false,
      })),
      videos: content?.videoIds?.map((videoId) => ({
        id: videoId,
        thumbnailUri: "",
        uri: `http://buzzmate.com/api/chat-svc/chats/${chatId}/videos/${videoId}`,
      })),
    },
    date: date ? new Date(date) : null,
    editDate: editDate ? new Date(editDate) : null,
    replyToMessageId,
    senderUserId,
    sentByMember: null,
    isDraft: false,
    isSending: false,
  };
};
