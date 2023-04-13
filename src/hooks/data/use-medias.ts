import _ from "lodash";
import { Media } from "src/models";
import { useChat } from "./use-chat";

export const useMedias = (chatId: string) => {
  const { chat, update: updateChat } = useChat(chatId);

  const findMediaIndex = (mediaId: string) => {
    return chat?.medias.findIndex((media) => media.id === mediaId);
  };

  const findMedia = (mediaId: string) => {
    return chat?.medias.find((media) => media.id === mediaId);
  };

  const setMedia = (
    messageId: string,
    updateMedia: ((media: Media) => Media) | Partial<Media>,
    merge = false
  ) => {
    updateChat((chat) => ({
      ...chat,
      medias: chat.medias.map((media) => {
        if (media.id === messageId) {
          if (typeof updateMedia === "function") return updateMedia(media);

          return (!merge ? updateMedia : _.merge(media, updateMedia)) as Media;
        }

        return media;
      }),
    }));
  };

  const addMedia = (newMedia: Media) => {
    updateChat((chat) => {
      const existMedia = findMedia(newMedia.id);

      if (existMedia) return chat;

      return {
        ...chat,
        medias: [...chat.medias, newMedia],
      };
    });
  };

  const removeMedia = (mediaId: string) => {
    updateChat((chat) => ({
      ...chat,
      medias: chat.medias.filter((media) => media.id !== mediaId),
    }));
  };

  return {
    medias: chat?.medias,
    findMediaIndex,
    findMedia,
    setMedia,
    addMedia,
    removeMedia,
  };
};
