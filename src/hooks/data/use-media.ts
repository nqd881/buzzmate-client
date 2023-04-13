import { Media } from "src/models";
import { useMedias } from "./use-medias";

export const useMedia = (chatId: string, mediaId: string) => {
  const { findMedia, setMedia } = useMedias(chatId);

  const media = findMedia(mediaId);

  const update = (updateFn: (media: Media) => Media) => {
    setMedia(mediaId, updateFn);
  };

  return { media, update };
};
