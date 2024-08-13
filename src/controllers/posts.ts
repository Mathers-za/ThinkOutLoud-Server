import Logging from "../library/Logging";
import PostsModel from "../models/Posts";
import { Schema } from "mongoose";
import Users from "../models/Users";

import { Request, Response, NextFunction, Errback } from "express";
import Posts from "../models/Posts";

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

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.postId;
  try {
    const updatedPost = await PostsModel.findByIdAndUpdate(postId, req.body, {
      runValidators: true,
      new: true,
    });
    Logging.warn(updatedPost);
    updatedPost
      ? res.status(201).json(updatedPost)
      : res.status(404).json({ message: "Document not found" });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    });
    Logging.error(error);
  }
};

interface DeletePostParams {
  postId: string;
  userId: string;
}

export const deletePost = async (
  req: Request<DeletePostParams>,
  res: Response,
  next: NextFunction
) => {
  const { postId, userId } = req.query;
  if (!postId || !userId) {
    return res
      .status(400)
      .json({ message: "Insuffcient params were supplied" });
  }
  try {
    const post = await PostsModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    } else if (userId !== post.creatorId.toString()) {
      return res.status(401).json({ message: "Unauthorised" });
    } else {
      await PostsModel.deleteOne({ _id: post._id });
      res.status(200).json({ message: "Deletion successfull" });
    }
  } catch (error: any) {
    Logging.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.postId;
  try {
    const post = await PostsModel.findById(postId);
    post
      ? res.status(200).json(post)
      : res.status(404).json({ message: "Document no found" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
    Logging.error(error);
  }
};
