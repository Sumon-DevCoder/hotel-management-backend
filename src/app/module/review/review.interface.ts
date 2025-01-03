import { ObjectId } from "mongoose";

export enum ReviewStatus {
  Approved = "approved",
  Pending = "pending",
  Rejected = "rejected",
}

export type TReview = {
  roomId: ObjectId;
  userId: ObjectId;
  rating: number;
  comment: string;
  status?: ReviewStatus;
  createdAt: Date;
  updatedAt: Date;
};
