import { Router } from "express";
import { errorResponse, successResponse } from "../../helper/serverResponse.js";
import visitormodel from "../../model/visitormodel.js";

const adminvisitorRouter = Router();

adminvisitorRouter.get("/", getvisitorHandler);

export default adminvisitorRouter;

async function getVisitorHandler(req, res) {
  try {
    const visitor = await visitormodel.findOne();
    const totalCount = visitor ? visitor.count : 0;

    successResponse(res, "Total visitor count fetched successfully", {
      totalCount,
    });
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "Internal server error");
  }
}
