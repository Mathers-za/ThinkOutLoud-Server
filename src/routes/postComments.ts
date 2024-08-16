import exp from "constants";
import express from "express";
import * as controller from "../controllers/postComments";
import { isRequestParamsProvided } from "../middleware/validationMiddleware";
import { handleAuthorisationToUpdateOrDelete } from "../utils/generalHelpers";
import commentsModel from "../models/Comments";

const router = express.Router();

router.get(
  "/getPostComments:postId",
  isRequestParamsProvided("postId"),
  controller.getPostComments
);

router.post("/createPostComment", controller.createPostComment);
router.delete(
  "/deleteComment:commentId",
  isRequestParamsProvided("commentId"),
  controller.deletComment
);

router.patch(
  "/updatePostComment:commentId",
  isRequestParamsProvided("commentId"),
  handleAuthorisationToUpdateOrDelete(
    commentsModel,
    "commentId",
    "commentatorId"
  ),
  controller.updatePostComment
);
