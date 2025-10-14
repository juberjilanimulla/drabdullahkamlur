import { Router } from "express";
import { errorResponse } from "../../helper/serverResponse.js";

const usercommentRouter = Router();

export default usercommentRouter;

async function createcommentHandler(req, res) {
  try {
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
