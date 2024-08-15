import express from "express";
import * as controller from "../controllers/posts";
import {
  checkQueryParamsCorrect,
  isRequestParamsProvided,
} from "../middleware/validationMiddleware";

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
  controller.updatePost
);
router.delete(
  "/deletePost",
  checkQueryParamsCorrect(["postId", "userId"]),
  controller.deletePost
);

router.get(
  "/getAllFriendsPosts:userId",
  isRequestParamsProvided("userId"),
  controller.getAllFriendsPosts
);

export default router;
