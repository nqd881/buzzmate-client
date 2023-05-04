export class ApiChatUser {
  id: string;
  identity: string;
  emailAddress: string;
  name: string;
  type: string;
}

export class ApiMember {
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
}

export class ApiFile {
  id: string;
  name: string;
  size: number;
  mimetype: string;
  date: Date;
}

export class ApiPhotoSize {
  width: number;
  height: number;
  file: File;
}

export class ApiPhoto {
  id: string;
  chatId: string;
  file: ApiFile;
  url: string;
}

export class ApiVideo {
  id: string;
  chatId: string;
  width: number;
  height: number;
  duration: number;
  thumbnail: any;
  file: ApiFile;
  url: string;
}

export class ApiDocument {
  id: string;
  chatId: string;
  file: ApiFile;
  url: string;
}

export class ApiMessageForwardInfo {
  fromChatId: string;
  fromMessageId: string;
  senderUserId: string;
}

export class ApiMessage {
  id: string;
  chatId: string;
  senderUserId: string;
  sentByMember: ApiMember;
  content: {
    text: string;
    hasMedia: boolean;
    photos: ApiPhoto[];
    videos: ApiVideo[];
    documents: ApiDocument[];
  };
  date: string;
  editDate: string;
  replyToMessageId: string;
  forwardInfo?: ApiMessageForwardInfo;
  seenByUserIds?: string[];
  views?: number;
  reactions?: any;
}

export class ApiChat {
  id: string;
  title: string;
  description: string;
  isGroupChat: boolean;
  isPrivateChat: boolean;
  isSelfChat: boolean;
  lastMessage: ApiMessage;
  memberCount: number;
  isFave?: boolean;
  isArchived?: boolean;
}
