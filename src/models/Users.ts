import mongoose, { Document, Schema } from "mongoose";
import regexPatterns from "../utils/regex";

export interface iUsers {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
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
      lowerVase: true,
      required: true,
      validate: {
        validator: (email: string) => regexPatterns.email.test(email),
        message: "Please provide a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
      validate: {
        validator: (password: string) =>
          regexPatterns.securePassword.test(password),
      },
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password confirm is a required field"],
      validate: {
        validator: function (this: any, confirmPassword: string) {
          return this.password ? confirmPassword === this.password : true;
        },
        message: "Passwords do not match",
      },
    },
    createdAt: { type: Date, default: () => Date.now, immutable: true },
    updatedAt: { type: Date, default: () => Date.now },
  },
  { versionKey: false }
);

export default mongoose.model<iUsersModel>("User", UsersSchema);
