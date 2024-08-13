import { Request, Response, NextFunction } from "express";
import Users from "../models/Users";
import Logging from "../library/Logging";
import passport from "passport";
import { isValidPassword } from "../utils/registrationAndLoginHelperfns";

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID = req.params.userId;
    const userData = await Users.findById(userID);
    userData
      ? res.status(200).json(userData)
      : res.status(404).json({ message: "Data not found" });
  } catch (error: any) {
    res.status(500).json({ error });
    Logging.error(error.message);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await Users.find({}).limit(10); //for now
    allUsers
      ? res.status(200).json(allUsers)
      : res.status(200).json({ message: "No users exist" });
  } catch (error: any) {
    res.status(500).json({ error });
    Logging.error(error.message);
  }
};
//TODO fighure out a flexible solution to handle updates in a way t6that accomodates embedded arays/embedded docs etc
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;

  try {
    const userData = await Users.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    userData
      ? res.status(201).json(userData)
      : res.status(404).json({ message: "User not found" });
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

  // Passport authenticate middleware
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
      });
    });
  })(req, res, next);
};
