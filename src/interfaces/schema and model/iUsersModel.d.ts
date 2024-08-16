import { Document, Schema } from "mongoose";

export interface iUsersSchema {
  firstName: string;
  lastName: string;
  friends?: Schema.Types.ObjectId[];
  email: string;
  additionalInfo?: {
    age?: number;
    hobbies?: string[];
    dateOfBirth?: Date;
    relationshipStatus?: string[];
    countriesVisited?: string[];
  };
  hash: String;
  salt: string;
}

export interface iUsersModel extends iUsersSchema, Document {}
