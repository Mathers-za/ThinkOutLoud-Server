import mongoose, { Document, Schema } from "mongoose";
import regexPatterns from "../utils/regex";
import passportLocalMongoose from "passport-local-mongoose";

export interface iUsers {
  firstName: string;
  lastName: string;
  email: string;
}

export interface iUsersModel extends iUsers, Document {}

const UsersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is a required field"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is a required field"],
    },

    email: {
      type: String,
      lowerCase: true,
      required: true,
      match: [regexPatterns.email, "Please provide a valid email address"],
    },
  },
  { timestamps: true }
);

UsersSchema.plugin(passportLocalMongoose, { usernameField: "email" });

export default mongoose.model<iUsersModel>("User", UsersSchema);
