import * as controller from "../controllers/users";
import express from "express";
import { isRequestParamsProvided } from "../middleware/validationMiddleware";

const router = express.Router();

router.post(`/register`, controller.registerUser);
router.get("/getUser", controller.getUser);
router.get("/getAllUsers", controller.getAllUsers);
router.patch(
  "/update:userId",
  isRequestParamsProvided("userId"),
  controller.updateUser
);
router.post("/login", controller.loginUser);

export default router;
