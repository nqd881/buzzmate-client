import { ApiPhoto, ApiVideo } from "@apis/models/chat";
import { sassClasses } from "@utils";
import Image, { ImageLoader } from "next/image";
import React, { PropsWithChildren } from "react";
import { Photo, Video } from "src/models";
import styles from "./MessageGallery.module.scss";

const cl = sassClasses(styles);

const MessageGalleryItemWrapper: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return <div className={cl("MessageGalleryItem")}>{children}</div>;
};

const MessageGalleryPhoto: React.FC<any> = (props: { photo: ApiPhoto }) => {
  const { photo } = props;

  const handleClick = () => {
    console.log("Click click");
  };

  // const myLoader: ImageLoader = ({ src, width, quality }) => {
  // return "";
  // // return `http://buzzmate.com/api/chat-svc/chats/${photo.chatId}/photos/${photoId}/original`;
  // };

  return (
    <Image
      className={cl("MessageGalleryPhoto")}
      alt=""
      key={photo.id}
      fill
      sizes="100%"
      src={photo.url}
      onClick={handleClick}
    />
  );
};

const MessageGalleryVideo: React.FC<{ video: ApiVideo }> = ({ video }) => {
  return (
    <video
      className={cl("MessageGalleryVideo")}
      key={video.id}
      src={video.url}
      controls
    />
  );
};

export const MessageGallery = React.memo(function MessageGallery(props: {
  photos?: ApiPhoto[];
  videos?: ApiVideo[];
  direction?: "ltr" | "rtl";
}) {
  const { photos, videos, direction } = props;

  return (
    <div className={cl(["MessageGallery", direction])}>
      {photos?.map((photo) => (
        <MessageGalleryItemWrapper key={`Photo_${photo.id}`}>
          <MessageGalleryPhoto photo={photo} />
        </MessageGalleryItemWrapper>
      ))}
      {videos?.map((video) => (
        <MessageGalleryItemWrapper key={`Video_${video.id}`}>
          <MessageGalleryVideo video={video} />
        </MessageGalleryItemWrapper>
      ))}
    </div>
  );
});
