import * as controller from "../controllers/users";
import express, { Router } from "express";

const router = express.Router();

router.post(`/create`, controller.createUser);
router.get("/getUser:userId", controller.getUserById);
router.get("/getAllUsers", controller.getAllUsers);
router.patch("/update:userId", controller.updateUser);

export default router;
