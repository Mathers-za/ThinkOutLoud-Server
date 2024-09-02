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
  checkQueryParamsCorrect(["searchString"]),
  controller.serverSideUsersSearch
);

router.get(
  "/getUser:userId",
  isRequestParamsProvided("userId"),
  controller.inspectUserDetails
);
router.patch(
  "/update",

  controller.updateUser
);
router.post("/login", controller.loginUser);

export default router;
