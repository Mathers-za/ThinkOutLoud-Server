import { NextFunction, Request, Response } from "express";
import { Model, Document, Schema } from "mongoose";
import { iUsersSchema } from "../customTypings/interfaces/schema and model/iUsersModel";
import Logging from "../library/Logging";

export const handleAuthorisationToUpdateOrDelete = <T>(
  model: Model<T>,
  paramIdName: string,
  fieldToCheckAgainst: string
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const documentId = req.params[paramIdName]; // Adjust based on your route parameter

    const document = await model.findById(documentId);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    } else if (
      (document as any)[fieldToCheckAgainst].toString() !==
      (req.user as iUsersSchema).id
    ) {
      console.log("made it here");
      return res.status(401).json({ message: "Unauthorised action" });
    } else {
      next();
    }
  };
};
