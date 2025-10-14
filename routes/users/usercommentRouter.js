import { Router } from "express";
import { errorResponse, successResponse } from "../../helper/serverResponse.js";
import commentmodel from "../../model/commentmodel.js";

const usercommentRouter = Router();

usercommentRouter;
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

async function getallcommentHandler(req, res) {
  try {
    const { _id } = req.body;
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
