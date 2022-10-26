import { IUserWithAdditionalInf } from "./user.model";

export interface IMessage {
  _id: string;
  category: string;
  groupForJoinId?: string;
  isProcessed: boolean;
  isRead: boolean;
  mailer: IUserWithAdditionalInf;
  message: string;
  messageDate: string;
  receiverId: string;
}
