import { IUserWithAdditionalInf } from "./user.model";

export interface IGroupShort {
  _id: string;
  name: string;
  description: string;
}

export interface IGroupFull extends IGroupShort {
  participantsApproved: IUserWithAdditionalInf[];
  isUserCandidate?: boolean;
  creatorId: string;
}

export interface IGroupFullForAdmin extends IGroupFull {
  participantsRequested: IUserWithAdditionalInf[];
  participantsNotResponded: string[];
  participantsDeclined: string[];
}

export interface IGroupCreate {
  creatorId: string;
  description: string;
  isPublic: boolean;
  name: string;
  participantsApproved: string[];
  participantsRequested: string[];
  participantsNotResponded: string[];
  participantsDeclined: string[]; 
}
