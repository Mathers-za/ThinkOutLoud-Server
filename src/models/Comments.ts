import mongoose, { Schema } from "mongoose";
import { iComments } from "../customTypings/interfaces/schema and model/iComments";

const CommentsSchema = new Schema<iComments>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      required: [true, "Post id is required"],
      ref: "posts",
    },
    content: {
      type: String,
      required: [true, "Comment content cannot be empty"],
    },
    comentatorId: {
      type: Schema.Types.ObjectId,
      required: [true, "Comentator id is required"],
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model("postComments", CommentsSchema);
