import { Router } from "express";
import { errorResponse, successResponse } from "../../helper/serverResponse.js";
import visitormodel from "../../model/visitormodel.js";

const adminvisitorRouter = Router();

adminvisitorRouter.get("/", getvisitorHandler);

export default adminvisitorRouter;

async function getvisitorHandler(req, res) {
  try {
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "Internal server error");
  }
}
