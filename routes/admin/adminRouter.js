import { Router } from "express";
import adminblogRouter from "./adminblogRouter.js";
import admincontactRouter from "./admincontactRouter.js";
import admincommentRouter from "./admincommentRouter.js";
import adminmediaRotuer from "./adminmediaRouter.js";

const adminRouter = Router();

adminRouter.use("/blogs", adminblogRouter);
adminRouter.use("/contact", admincontactRouter);
adminRouter.use("/comment", admincommentRouter);
adminRouter.use("/media", adminmediaRotuer);

export default adminRouter;
