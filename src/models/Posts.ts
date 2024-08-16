import mongoose, { Schema, Document } from "mongoose";
import {
  iPostsModel,
  iPostsSchema,
} from "../interfaces/schema and model/iPostsModel";
const PostsSchema: Schema = new Schema<iPostsSchema>(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    content: {
      type: String,
      maxLength: [300, "Post content cannot exceed 300 characters"],
      required: [true, "Your cannot upload an empty post"],
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        type: Schema.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iPostsModel>("Posts", PostsSchema);
