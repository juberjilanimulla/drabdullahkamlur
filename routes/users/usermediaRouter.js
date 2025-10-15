import { Router } from "express";
import mediamodel from "../../model/mediamodel.js";
import { successResponse, errorResponse } from "../../helper/serverResponse.js";

const usermediaRouter = Router();

usermediaRouter.get("/", getallmediaHandler);

export default usermediaRouter;

async function getallmediaHandler(req, res) {
  try {
    const media = await mediamodel.find();
    if (!media) {
      return successResponse(res, 404, "media not found");
    }
    successResponse(res, "success", media);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
