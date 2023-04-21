import { SendMessagePayload } from "@apis/chat/send-message";
import { ApiMessage } from "@apis/models/chat";
import { useChatUserId } from "@hooks/useChatUserId";
import { isPhotoFile, isVideoFile } from "@utils/file";
import { v4 } from "uuid";
import { UpdateMessageFn } from "./useMessages";

export const useCreateMessage = (chatId: string) => {
  const chatUserId = useChatUserId();

  const createMessage = (
    payload: SendMessagePayload,
    updateFn: (updater: UpdateMessageFn) => void
  ): ApiMessage => {
    const { prepareMessageId, message, replyToMessageId, files } = payload;

    const photoFiles = [],
      videoFiles = [],
      documentFiles = [];

    if (files) {
      for (let index = 0; index < files.length; index++) {
        let file = files[index];

        switch (true) {
          case isPhotoFile(file): {
            photoFiles.push({ localId: v4(), file });
            break;
          }
          case isVideoFile(file): {
            videoFiles.push({ localId: v4(), file });
            break;
          }
          default: {
            documentFiles.push({ localId: v4(), file });
          }
        }
      }
    }

    photoFiles?.forEach(({ localId, file: photoFile }) => {
      const reader = new FileReader();
      reader.readAsDataURL(photoFile);

      reader.onload = () => {
        updateFn((message) => ({
          ...message,
          content: {
            ...message.content,
            photos: message.content.photos.map((photo) => {
              if (photo.id === localId) {
                return {
                  ...photo,
                  url: reader.result.toString(),
                };
              }

              return photo;
            }),
          },
        }));
        // updateMessage(prepareMessageId, (message) => ({
        //   ...message,
        //   content: {
        //     ...message.content,
        //     photos: message.content.photos.map((photo) => {
        //       if (photo.id === localId) {
        //         return {
        //           ...photo,
        //           url: reader.result.toString(),
        //         };
        //       }

        //       return photo;
        //     }),
        //   },
        // }));
      };
    });

    return {
      id: prepareMessageId,
      chatId,
      content: {
        text: message ?? null,
        hasMedia: Boolean(files?.length),
        photos: photoFiles.map(({ localId, file: photoFile }) => ({
          id: localId,
          chatId,
          file: null,
          url: "",
        })),
        videos: videoFiles.map(({ localId, file: videoFile }) => ({
          id: localId,
          chatId,
          width: null,
          height: null,
          duration: null,
          thumbnail: null,
          file: null,
          url: URL.createObjectURL(videoFile),
        })),
        documents: [],
      },
      date: new Date().toString(),
      editDate: null,
      replyToMessageId,
      senderUserId: chatUserId,
      sentByMember: null,
    };
  };

  return createMessage;
};
