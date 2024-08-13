import express from "express";
import * as controller from "../controllers/posts";
import { isRequestParamsProvided } from "../middleware/validationMiddleware";

const router = express.Router();

router.post("/create", controller.createPost);
router.get(
  "/getPost:postId",
  isRequestParamsProvided("postId"),
  controller.getPost
);
router.patch(
  "/update:postId",
  isRequestParamsProvided("postId"),
  controller.updatePost
);
router.delete("/delete", controller.deletePost);

export default router;
