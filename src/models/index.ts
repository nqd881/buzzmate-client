export type Photo = {
  id: string;
  isLocal: boolean;
  localUri: string;
  remoteUri: string;
  isSending: boolean;
};

export type Video = {
  id: string;
  thumbnailUri: string;
  uri: string;
};

export type Document = {
  id: string;
};

export type Media = {
  id: string;
  isPhoto: boolean;
  isVideo: boolean;
  isDocument: boolean;
  content: Photo | Video | Document;
};

export type Message = {
  id: string;
  chatId: string;
  content: {
    text?: string;
    photos?: Photo[];
    videos?: Video[];
  };
  date: Date;
  editDate: Date;
  replyToMessageId: string;
  senderUserId: string;
  sentByMember: Member;
  isSending: boolean;
  isDraft: boolean;
};

export type Member = {
  id: string;
  chatId: string;
  userId: string;
  name: string;
  nickname: string;
  inviterUserId: string;
  joinedDate: number;
  isBanned: boolean;
  hasLeft: boolean;
  leaveDate?: number;
  bannedDate?: number;
  isAdmin?: boolean;
  isOwner?: boolean;
};

export type Chat = {
  id: string;
  title: string;
  description: string;
  messages: Message[];
  members: Member[];
  medias: Media[];
};
