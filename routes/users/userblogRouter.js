import { Router } from "express";
import { errorResponse, successResponse } from "../../helper/serverResponse.js";
import blogmodel from "../../model/blogmodel.js";

const userblogRouter = Router();

userblogRouter.get("/", getallblogHandler);
userblogRouter.get("/:id", getsingleblogHandler);
userblogRouter.get("/readers/:id", getreadercountHandler);

export default userblogRouter;

async function getallblogHandler(req, res) {
  try {
    const blog = await blogmodel
      .find({ published: true })
      .sort({ createdAt: -1 });
    if (!blog) {
      return successResponse(res, 404, "blog not found");
    }
    successResponse(res, "successfully blog", blog);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function getsingleblogHandler(req, res) {
  try {
    const { id } = req.params;
    let blog = await blogmodel.findById(id);

    if (!blog) {
      return errorResponse(res, 404, "Blog not found");
    }

    const previousReaders = blog.readers;
    blog.readers += 1;
    await blog.save();

    const currentReaders = blog.readers;
    successResponse(res, "Blog fetched successfully", {
      blog,
    });
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "Internal server error");
  }
}

async function getreadercountHandler(req, res) {
  try {
    const { id } = req.params;
    const blog = await blogmodel.findById(id);

    if (!blog) {
      return errorResponse(res, 404, "Blog not found");
    }
    successResponse(res, "Reader count fetched successfully", {
      readers: blog.readers,
    });
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "Internal server error");
  }
}
