import express from "express";
import * as controller from "../controllers/posts";

import {
  checkQueryParamsCorrect,
  isRequestParamsProvided,
} from "../middleware/validationMiddleware";
import { handleAuthorisationToUpdateOrDelete } from "../utils/generalHelpers";

import PostModel from "../models/Posts";
import { iPostsModel } from "../customTypings/interfaces/schema and model/iPostsModel";

const router = express.Router();

router.post("/createPost", controller.createPost);
router.get(
  "/getPost:postId",
  isRequestParamsProvided("postId"),
  controller.getPost
);
router.patch(
  "/updatePost:postId",
  isRequestParamsProvided("postId"),
  handleAuthorisationToUpdateOrDelete<iPostsModel>(
    PostModel,
    "postId",
    "creatorId"
  ),
  controller.updatePost
);
router.delete(
  "/deletePost:postId",
  isRequestParamsProvided("postId"),
  handleAuthorisationToUpdateOrDelete<iPostsModel>(
    PostModel,
    "postId",
    "creatorId"
  ),
  controller.deletePost
);

router.get(
  "/getAllFriendsPosts",

  checkQueryParamsCorrect(["page", "pageSize"]),
  controller.getAllFriendsPosts
);
router.get(
  "/getUserPosts:userId",
  isRequestParamsProvided("userId"),
  checkQueryParamsCorrect(["page", "pageSize"])
);

export default router;
