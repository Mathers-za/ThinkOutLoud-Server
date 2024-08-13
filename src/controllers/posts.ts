import Logging from "../library/Logging";
import PostsModel from "../models/Posts";

import { Request, Response, NextFunction, Errback } from "express";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdPost = await PostsModel.create(req.body);
    res.status(201).json(createdPost);
  } catch (error: unknown) {
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    });
    Logging.error(error);
  }
};
const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
const getPost = async (req: Request, res: Response, next: NextFunction) => {};
