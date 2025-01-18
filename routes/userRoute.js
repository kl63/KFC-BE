import express from "express";
import { loginUser, registerUser, listUsers } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/list", listUsers);

export default userRouter;
