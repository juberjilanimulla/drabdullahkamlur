import { Router } from "express";
import { errorResponse, successResponse } from "../../helper/serverResponse.js";
import visitormodel from "../../model/visitormodel.js";

const uservisitorRouter = Router();

uservisitorRouter.get("/", getIncrementVisitorHandler);
uservisitorRouter.get("/get", getVisitorHandler);

export default uservisitorRouter;

// Increment visitor count
async function getIncrementVisitorHandler(req, res) {
  try {
    let visitor = await visitormodel.findOne();

    let previousCount = 0;
    let currentCount = 0;

    if (!visitor) {
      visitor = await visitormodel.create({ count: 1 });
      previousCount = 0;
      currentCount = 1;
    } else {
      previousCount = visitor.count;
      visitor.count += 1;
      await visitor.save();
      currentCount = visitor.count;
    }

    // ✅ Correct usage
    successResponse(res, "Visitor count incremented successfully", {
      previousCount,
      currentCount,
    });
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "Internal server error");
  }
}

// Get total visitor count
async function getVisitorHandler(req, res) {
  try {
    const visitor = await visitormodel.findOne();
    const totalCount = visitor ? visitor.count : 0;

    // ✅ Correct usage
    successResponse(res, "Total visitor count fetched successfully", {
      totalCount,
    });
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "Internal server error");
  }
}
