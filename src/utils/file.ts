export const isPhotoFile = (file: File) => {
  if (!file) return false;

  return file.type.split("/")[0] === "image";
};

export const isVideoFile = (file: File) => {
  if (!file) return false;

  return file.type.split("/")[0] === "video";
};
