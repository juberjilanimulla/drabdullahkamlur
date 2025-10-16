import { Router } from "express";
import { errorResponse, successResponse } from "../../helper/serverResponse.js";

const adminvisitorRouter = Router();

export default adminvisitorRouter;

async function getvisitorHandler(req, res) {
  try {
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "Internal server error");
  }
}
