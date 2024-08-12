import * as controller from "../controllers/users";
import express, { Router } from "express";

const router = express.Router();

router.post(`/register`, controller.registerUser);
router.get("/getUser:userId", controller.getUserById);
router.get("/getAllUsers", controller.getAllUsers);
router.patch("/update:userId", controller.updateUser);
router.post("/login", controller.loginUser);

export default router;
