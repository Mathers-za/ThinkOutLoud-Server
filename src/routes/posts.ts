import express from "express";
import * as controller from "../controllers/posts";
import * as postAggregationsAndHelpers from "../utils/postAggregationsAndHelpers";
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
  checkQueryParamsCorrect(["page,pageSize"])
);
router.get(
  "/getUserPosts:userId",
  isRequestParamsProvided("userId"),
  checkQueryParamsCorrect(["page,pageSize"])
);

export default router;
