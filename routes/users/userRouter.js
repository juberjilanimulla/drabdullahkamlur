import { Router } from "express";
import userblogRouter from "./userblogRouter.js";
import usercontactRouter from "./usercontactRouter.js";
import usercommentRouter from "./usercommentRouter.js";
import usermediaRouter from "./usermediaRouter.js";
import uservisitorRouter from "./uservisitorRouter.js";

const userRouter = Router();

userRouter.use("/blog", userblogRouter);
userRouter.use("/contact", usercontactRouter);
userRouter.use("/comment", usercommentRouter);
userRouter.use("/media", usermediaRouter);
userRouter.use("/visitor", uservisitorRouter);

export default userRouter;
