import { Request, Response, NextFunction } from "express";
import CustomError from "../library/CustomError";
import Logging from "../library/Logging";

export const isRequestParamsProvided = (paramaterKey: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.params[paramaterKey] == undefined) {
      next();
    } else {
      Logging.warn("made it here");
      next(
        new CustomError("badRequest", "Request paramater not provided", 400)
      );
    }
  };
};
