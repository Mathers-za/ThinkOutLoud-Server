import { Request, Response, NextFunction } from "express";
import Users, { iUsersModel } from "../models/Users";
import Logging from "../library/Logging";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUSer = await Users.create(req.body);
    Logging.log(newUSer);
    res.status(201).json(newUSer);
  } catch (error: any) {
    res.status(500).json({ error });
    Logging.error(error._message);
  }
};

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
