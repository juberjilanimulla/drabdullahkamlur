import { Router } from "express";
import adminblogRouter from "./adminblogRouter.js";
import admincontactRouter from "./admincontactRouter.js";
import adminmediaRouter from "./adminmediaRouter.js";

const adminRouter = Router();

adminRouter.use("/blog", adminblogRouter);
adminRouter.use("/contact", admincontactRouter);

export default adminRouter;
