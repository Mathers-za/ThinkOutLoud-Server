import mongoose, { Schema, Document } from "mongoose";
export interface iPostsModel extends Document {}
const PostsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    content: {
      type: String,
      maxLength: [300, "Post content cannot exceed 300 characters"],
      required: [true, "Your cannot upload an empty post"],
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        content: {
          type: String,
          minlength: [1, "You cannot post an empty comment"],
        },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        createdAt: {
          type: Date,
          default: Date.now,
          immutable: true,
        },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iPostsModel>("Posts", PostsSchema);
