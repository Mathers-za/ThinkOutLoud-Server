import { NextFunction, Request, Response } from "express";
import CommentsModel from "../models/Comments";
import Logging from "../library/Logging";

export const getPostComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.postId;

  try {
    const comments = CommentsModel.find({ postId: postId }).populate({
      path: "comentatorId",
      select: "firstName lastName",
    });
    res.status(200).json(comments);
  } catch (error) {
    Logging.error(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const createPostComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await CommentsModel.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    Logging.error(error);

    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const updatePostComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId = req.params.commentId;

  try {
    const result = await CommentsModel.updateOne({ _id: commentId });
  } catch (error) {
    Logging.error(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const deletComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId = req.params.commentId;

  try {
    const result = await CommentsModel.deleteOne({ _id: commentId });
    if (result.deletedCount > 0) {
      res.status(204).end();
    } else {
      throw new Error("Failed to delete comment");
    }
  } catch (error) {
    Logging.error(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
