export class ApiChatUser {
  id: string;
  identity: string;
  emailAddress: string;
  name: string;
  type: string;
}

export class ApiChatMember {
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
}

export class ApiVideo {
  id: string;
  chatId: string;
  width: number;
  height: number;
  duration: number;
  thumbnail: any;
  file: ApiFile;
}

export class ApiDocument {
  id: string;
  chatId: string;
  file: ApiFile;
}

export class ApiMessage {
  id: string;
  chatId: string;
  senderUserId: string;
  sentByMember: ApiChatMember;
  content: {
    text: string;
    photoIds: string[];
    videoIds: string[];
    documentIds: string[];
  };
  date: number;
  editDate: number;
  replyToMessageId: string;
  forwardInfo?: {
    fromChatId: string;
    fromMessageId: string;
    senderUserId: string;
  };
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
  isMyFave: boolean;
  isArchived: boolean;
  lastMessage: ApiMessage;
  memberCount: number;
}
