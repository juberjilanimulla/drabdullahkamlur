import { Router } from "express";
import { errorResponse, successResponse } from "../../helper/serverResponse.js";
import commentmodel from "../../model/commentmodel.js";

const admincommentRouter = Router();

admincommentRouter.post("/", getallcommentHandler);
admincommentRouter.delete("/delete", deletecommentHandler);
admincommentRouter.post("/published", publishedcommentHandler);

export default admincommentRouter;

async function getallcommentHandler(req, res) {
  try {
    const { pageno = 0, filterBy = {}, sortby = {}, search = "" } = req.body;
    const limit = 10;
    const skip = pageno * limit;

    let query = {};

    // Apply search
    if (search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
        { message: { $regex: searchRegex } },
      ];
    }

    // Apply filters
    if (filterBy && Object.keys(filterBy).length > 0) {
      query = {
        ...query,
        ...filterBy,
      };
    }

    // Sorting logic
    const sortBy =
      Object.keys(sortby).length !== 0
        ? Object.keys(sortby).reduce((acc, key) => {
            acc[key] = sortby[key] === "asc" ? 1 : -1;
            return acc;
          }, {})
        : { createdAt: -1 };

    // Fetch paginated blogs
    const comment = await commentmodel
      .find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    const totalCount = await commentmodel.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    successResponse(res, "successfully", {
      comment,
      totalPages,
    });
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function deletecommentHandler(req, res) {
  try {
    const { _id } = req.body;
    if (!_id) {
      return errorResponse(res, 400, "some params are missing");
    }
    const existcomment = await commentmodel.findById({ _id: _id });
    if (!existcomment) {
      return errorResponse(res, 404, "contact details not found");
    }
    const comment = await commentmodel.findByIdAndDelete({ _id: _id });
    successResponse(res, "Delete");
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function publishedcommentHandler(req, res) {
  try {
    const { commentid, published } = req.body;

    if (!commentid) {
      return errorResponse(res, 400, "Comment ID is required");
    }

    if (typeof published !== "boolean") {
      return errorResponse(
        res,
        400,
        "Invalid published value, must be boolean"
      );
    }

    // Check if comment exists
    const existingComment = await commentmodel.findById(commentid);
    if (!existingComment) {
      return errorResponse(res, 404, "Comment not found");
    }

    // Update and save
    existingComment.published = published;
    await existingComment.save();

    return successResponse(
      res,
      "Comment updated successfully",
      existingComment
    );
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
