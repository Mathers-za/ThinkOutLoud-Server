import Logging from "../library/Logging";
import PostsModel from "../models/Posts";

import UsersModel from "../models/Users";

import { Request, Response, NextFunction, Errback } from "express";

import { getAllUsersPosts } from "../utils/postAggregationsAndHelpers";
import { iUsersSchema } from "../customTypings/interfaces/schema and model/iUsersModel";
import { iPostsSchema } from "../customTypings/interfaces/schema and model/iPostsModel";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdPost = await PostsModel.create({
      ...req.body,
      creatorId: (req.user as iUsersSchema).id,
    });
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
    const result = await PostsModel.updateOne({ _id: postId }, req.body, {
      runValidators: true,
    });
    if (result.modifiedCount > 0) {
      res.status(201).json({ message: "Successfully updated post" });
    } else {
      throw new Error("Post failed to update");
    }
  } catch (error: unknown) {
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    });
    Logging.error(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.postId;

  try {
    const result = await PostsModel.deleteOne({ _id: postId });
    if (result.deletedCount === 0) {
      throw new Error("Failed to delete post");
    } else {
      res.status(204).end();
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
      : res.status(404).json({ message: "Post not found" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
    Logging.error(error);
  }
};

export const getAllFriendsPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req.user as iUsersSchema).id;
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  console.log("Page number passed is " + page);
  console.log("Page size passed is " + pageSize);

  try {
    const user = await UsersModel.findById(userId, { friends: 1 });
    if (user && Array.isArray(user.friends)) {
      console.log(
        "made it in if statment of  get all friends posts controller"
      );
      const posts = await getAllUsersPosts(user.friends, page, pageSize);
      console.log("posts are " + JSON.stringify(posts));
      Logging.warn(posts);
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "User not found " });
    }
  } catch (error) {
    Logging.error(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const getUsersPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  const page = parseInt(req.query.pageSize as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  try {
    const user = await UsersModel.exists({ _id: userId });
    if (user) {
      const posts = await getAllUsersPosts([userId], page, pageSize);
      res.status(200).json(posts);
    }
  } catch (error) {
    Logging.error(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
