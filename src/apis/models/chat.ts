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
}

export class ApiPhotoSize {
  width: number;
  height: number;
  file: File;
}

export class ApiPhoto {
  id: string;
  original: ApiPhotoSize;
  variants: Map<string, ApiPhotoSize>;
}

export class ApiVideo {
  id: string;
  width: number;
  height: number;
  duration: number;
  thumbnail: any;
  file: File;
}

export class ApiDocument {
  id: string;
  file: File;
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
