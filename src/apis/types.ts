export class UserAddress {
  countryCode: string;
  state: string;
  city: string;
  streetLine1: string;
  streetLine2: string;
  postalCode: string;
}

export class UserEmail {
  emailAddress: string;
  isVerified: boolean;
}

export class UserEmails {
  mainEmail: UserEmail;
  extraEmail: UserEmail;
}

export class UserProfileDetails {
  firstName: string;
  lastName: string;
  birthDate: Date;
  photo: string;
  address: UserAddress;
}

export class UserProfileBasic {
  firstName: string;
  lastName: string;
  photo: string;
}

export class UserSettingLanguage {}

export class UserSetting {}

export enum UserTypes {
  Regular = "regular",
  Admin = "admin",
}

export class UserFullInfo {
  id: string;
  type: UserTypes;
  profile: UserProfileDetails;
  setting: UserSetting;
  emails: UserEmails;
}

export enum ChatState {
  Started = "started",
  Archived = "archived",
  Deleted = "deleted",
}

export class Document {}

export class MessageTextContent {
  text: string;
}

export class MessageDocumentContent {
  document: Document;
  caption: string;
}

export type MessageContent = MessageTextContent | MessageDocumentContent;

export enum MessageContentType {
  Text = "text",
  Document = "document",
}

export class Message {
  chat_id: string;
  sender_id: string;
  reply_to: string;
  type: string;
  content: MessageContent;
  date: Date;
}

export class Member {
  member_id: string;
  user_id: string;
  photo: string;
  nickname: string;
  is_admin: boolean;
  joined_date: Date;
  last_message_viewed: string;
  last_seen: Date;
}

export class Chat {
  id: string;
  title: string;
  creator_id: string;
  chat_photo: string;
  state: ChatState;
  members: Member[];
  last_message: Message;
}
