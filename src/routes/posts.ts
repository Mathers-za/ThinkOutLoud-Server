import express from "express";
import * as controller from "../controllers/posts";
import * as postAggregationsAndHelpers from "../utils/postAggregationsAndHelpers";
import {
  checkQueryParamsCorrect,
  isRequestParamsProvided,
} from "../middleware/validationMiddleware";
import { handleAuthorisationToUpdateOrDelete } from "../utils/generalHelpers";
import UserModel from "../models/Users";
import { iUsersModel } from "../customTypings/interfaces/schema and model/iUsersModel";
import PostModel from "../models/Posts";

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
  handleAuthorisationToUpdateOrDelete(UserModel, "postId", "creatorId"),
  controller.updatePost
);
router.delete(
  "/deletePost",
  isRequestParamsProvided("postId"),
  handleAuthorisationToUpdateOrDelete(PostModel, "postId", "creatorId"),
  controller.deletePost
);

router.get(
  "/getAllFriendsPosts:userId",
  isRequestParamsProvided("userId"),
  checkQueryParamsCorrect(["page,pageSize"])
);
router.get(
  "/getUserPosts:userId",
  isRequestParamsProvided("userId"),
  checkQueryParamsCorrect(["page,pageSize"])
);

export default router;
