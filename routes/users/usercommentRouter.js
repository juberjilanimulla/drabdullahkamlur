import { Router } from "express";
import { errorResponse } from "../../helper/serverResponse.js";

const usercommentRouter = Router();

usercommentRouter.post("/create", createcommentHandler);

export default usercommentRouter;

async function createcommentHandler(req, res) {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return errorResponse(res, 400, "some params are missing");
    }
    const params = { name, email, message };
    const comment = await commentmodel.create(params);
    successResponse(res, "success", comment);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
