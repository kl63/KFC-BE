import express from "express";
import { loginAdmin, registerAdmin, listAdmins, removeAdmin  } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/register", registerAdmin);
adminRouter.get("/list", listAdmins);
adminRouter.delete('/remove', removeAdmin);
adminRouter.delete('/remove/:id', removeAdmin);



export default adminRouter;
