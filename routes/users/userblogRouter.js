import { Router } from "express";
import { errorResponse, successResponse } from "../../helper/serverResponse.js";
import blogmodel from "../../model/blogmodel.js";

const userblogRouter = Router();

userblogRouter.get("/", getallblogHandler);

export default userblogRouter;

async function getallblogHandler(req, res) {
  try {
    const blog = await blogmodel.find({ published: true });
    if (!blog) {
      return successResponse(res, 404, "blog not found");
    }
    successResponse(res, "successfully blog", blog);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
