import { Document, Schema } from "mongoose";

export interface iPostsSchema {
  creatorId: Schema.Types.ObjectId;

  content: string;
  likes?: Schema.Types.ObjectId[];
  comments?: {
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    commentatorId: Schema.Types.ObjectId[];
  };
}

export interface iPostsModel extends iPostsSchema, Document {}
