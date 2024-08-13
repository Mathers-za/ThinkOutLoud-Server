import mongoose, { Document, Schema } from "mongoose";
import regexPatterns from "../utils/regex";
import passportLocalMongoose from "passport-local-mongoose";

export interface iUsersModel extends Document {}

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
      lowercase: true,
      required: true,
      match: [regexPatterns.email, "Please provide a valid email address"],
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],

    additionalInfo: {
      age: {
        type: Number,
        min: [1, "Your age cannot be less than 1 "],
        max: [200, "Older than 200! Keep dreaming"],
      },
      hobbies: [String],
      dateOfBirth: { type: Date },
      relationshipStatus: {
        type: String,
        enum: ["Single", "Married", "In a relationship", "Forever-alone"],
      },
      countriesVisited: [String],
    },
  },
  { timestamps: true }
);

UsersSchema.plugin(passportLocalMongoose, { usernameField: "email" });

export default mongoose.model<iUsersModel>("User", UsersSchema);
