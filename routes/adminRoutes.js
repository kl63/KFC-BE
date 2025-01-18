import express from "express";
import { loginAdmin, registerAdmin, listAdmins  } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/register", registerAdmin);
adminRouter.get("/list", listAdmins);



export default adminRouter;
