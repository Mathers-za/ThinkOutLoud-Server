import * as controller from "../controllers/users";
import express from "express";
import {
  checkQueryParamsCorrect,
  isRequestParamsProvided,
} from "../middleware/validationMiddleware";

const router = express.Router();

router.post(`/register`, controller.registerUser);
router.get("/getUserOnlogin", controller.intialGetUserAfterLogin);
router.get(
  "/usersSearch",
  checkQueryParamsCorrect(["firstName", "lastName"]),
  controller.serverSideUsersSearch
);
router.get(
  "/getUser:userId",
  isRequestParamsProvided("userId"),
  controller.inspectUserDetails
);
router.patch(
  "/update:userId",
  isRequestParamsProvided("userId"),
  controller.updateUser
);
router.post("/login", controller.loginUser);

export default router;
