import exp from "constants";
import express from "express";
import * as controller from "../controllers/postComments";
import {
  checkQueryParamsCorrect,
  isRequestParamsProvided,
} from "../middleware/validationMiddleware";
import { handleAuthorisationToUpdateOrDelete } from "../utils/generalHelpers";
import commentsModel from "../models/Comments";
import { iComments } from "../customTypings/interfaces/schema and model/iComments";

const router = express.Router();

router.get(
  "/getPostComments:postId",
  isRequestParamsProvided("postId"),
  controller.getPostComments
);

router.post("/createPostComment", controller.createPostComment);
router.delete(
  "/deleteComment",
  checkQueryParamsCorrect(["commentId", "commentAuthor", "postAuthor"]),
  controller.deletComment
);

router.patch(
  "/updatePostComment:commentId",
  isRequestParamsProvided("commentId"),
  handleAuthorisationToUpdateOrDelete<iComments>(
    commentsModel,
    "commentId",
    "commentatorId"
  ),
  controller.updatePostComment
);
