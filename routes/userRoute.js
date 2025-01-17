import express from "express";
import { loginUser, registerUser, listUsers, removeUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/list", listUsers);
userRouter.delete('/remove/:id', removeUser);

export default userRouter;
