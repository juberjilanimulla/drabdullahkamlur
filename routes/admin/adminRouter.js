import { Router } from "express";
import adminblogRouter from "./adminblogRouter.js";
import admincontactRouter from "./admincontactRouter.js";
import admincommentRouter from "./admincommentRouter.js";
import adminmediaRotuer from "./adminmediaRouter.js";
import adminvisitorRouter from "./adminvisitorRouter.js";

const adminRouter = Router();

adminRouter.use("/blogs", adminblogRouter);
adminRouter.use("/contact", admincontactRouter);
adminRouter.use("/comment", admincommentRouter);
adminRouter.use("/media", adminmediaRotuer);
adminRouter.use("/visitor", adminvisitorRouter);

export default adminRouter;
