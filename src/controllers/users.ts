import { Request, Response, NextFunction } from "express";
import Users from "../models/Users";
import Logging from "../library/Logging";
import passport from "passport";
import { isValidPassword } from "../utils/registrationAndLoginHelperfns";
import "express-session";
import {
  iUsersModel,
  iUsersSchema,
} from "../customTypings/interfaces/schema and model/iUsersModel";
import { Schema } from "mongoose";

export const intialGetUserAfterLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = await Users.findById((req.user as iUsersModel).id);
    userData
      ? res.status(200).json(userData)
      : res.status(404).json({ message: "Data not found" });
  } catch (error: any) {
    res.status(500).json({ error });
    Logging.error(error.message);
  }
};

export const inspectUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;

  try {
    const userData = await Users.findById(userId, { hash: 0, salt: 0, __v: 0 });
  } catch (error: any) {
    Logging.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const serverSideUsersSearch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const searchString = req.query.searchString;
  try {
    const allUsers = await Users.find({
      $or: [
        { firstName: { $regex: searchString, $options: "i" } },
        { lastName: { $regex: searchString, $options: "i" } },
      ],
    }).limit(10); //for now
    res.status(200).json(allUsers);
  } catch (error: any) {
    res.status(500).json({ error });
    Logging.error(error.message);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req.user as iUsersSchema).id;

  try {
    const updateWriteResult = await Users.updateOne({ _id: userId }, req.body, {
      runValidators: true,
    });
    if (updateWriteResult.modifiedCount > 0) {
      res.status(204).end();
    } else {
      res.status(400).json({
        message:
          "Failed to update resourse. You probably didnt structure the patch object correctly.",
      });
    }
  } catch (error: any) {
    res.status(500).json({ error });
    Logging.error(error.message);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const errorMessage = isValidPassword(
      req.body.password,
      req.body.passwordConfirm
    );

    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }
    Users.register(
      new Users(req.body),
      req.body.password,
      function (error, user) {
        if (error) {
          Logging.error(error);
          return res.status(400).json({
            success: false,
            message:
              error.name === "MissingUsernameError"
                ? "Email address is required"
                : error.name === "UserExistsError"
                ? "Email adrress already exists.Please use a diffrent one"
                : error.message,
          });
        }

        res.status(201).json({
          message: "Account created and logged in successfully",
          success: true,
        });
      }
    );
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error " + error.message,
    });
  }
};

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Email or password is missing" });
  }

  passport.authenticate("local", (error: any, user: any, info: any) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Internal server error", error: err.message });
      }

      return res.status(200).json({
        message: "Successfully logged in",
        userId: user._id,
        requestId: req.sessionID,
      });
    });
  })(req, res, next);
};
