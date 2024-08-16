import { Schema, Document } from "mongoose";

export interface iComments {
  _id: Schema.Types.ObjectId;
  content: string;
  comentatorId: Schema.Types.ObjectId;
  createdAt: date;
  updatedAt: date;
  postId: Schema.Types.ObjectId;
}

export interface iCommentsModel extends iComments, Document {}
