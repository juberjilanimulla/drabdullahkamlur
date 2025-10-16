import { Router } from "express";
import { errorResponse, successResponse } from "../../helper/serverResponse.js";
import visitormodel from "../../model/visitormodel.js";

const uservisitorRouter = Router();

uservisitorRouter.get("/", getvisitorHandler);

export default uservisitorRouter;

async function getvisitorHandler(req, res) {
  try {
    // Find the single visitor record
    const visitor = await visitormodel.findOne();

    // If no record, create it
    if (!visitor) {
      visitor = await visitormodel.create({ count: 1 });
    } else {
      visitor.count += 1;
      await visitor.save();
    }

    successResponse(res, 200, "Visitor count incremented", {
      count: visitor.count,
    });
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "Internal server error");
  }
}
