import { Router } from "express";
import mediamodel from "../../model/mediamodel.js";
import { successResponse, errorResponse } from "../../helper/serverResponse.js";
import adminmediaimageRouter from "./adminuploadmediaimageRouter.js";

const adminmediaRotuer = Router();

adminmediaRotuer.post("/", getallmediaHandler);
adminmediaRotuer.post("/create", createmediaHandler);
adminmediaRotuer.put("/update", updatemediaHandler);
adminmediaRotuer.delete("/delete", deletemediaHandler);
adminmediaimageRouter.use("/upload", adminmediaimageRouter);
export default adminmediaRotuer;

async function getallmediaHandler(req, res) {
  try {
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function createmediaHandler(req, res) {
  try {
    const { title, description } = req.body;
    if (!title) {
      return errorResponse(res, 400, "some params are missing");
    }
    const params = { title, description };
    const media = await mediamodel.create(params);
    successResponse(res, "success", media);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function updatemediaHandler(req, res) {
  try {
    const { _id, ...updatedData } = req.body;
    if (!_id) {
      return errorResponse(res, 400, "Media ID (_id) is required");
    }

    const existingMedia = await mediamodel.findById(_id);
    if (!existingMedia) {
      return errorResponse(res, 404, "Media is not exist");
    }

    const options = { new: true };
    if (!updatedData.title || !updatedData.description) {
      errorResponse(res, 404, "Some params are missing");
      return;
    }
    const media = await mediamodel.findByIdAndUpdate(_id, updatedData, options);
    successResponse(res, "successfully updated", media);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function deletemediaHandler(req, res) {
  try {
    // const { _id } = req.body;
    // if (!_id) {
    //   return errorResponse(res, 400, "blog ID (_id) is required");
    // }
    // // Find property before deletion (to access images)
    // const blog = await blogmodel.findById(_id);
    // if (!blog) {
    //   return errorResponse(res, 404, "blog not found");
    // }
    // // Delete all images from S3
    // const s3Key = blog.coverimage?.split(".amazonaws.com/")[1];
    // if (s3Key) {
    //   await s3.send(
    //     new DeleteObjectCommand({
    //       Bucket: process.env.AWS_BUCKET_NAME,
    //       Key: s3Key,
    //     })
    //   );
    // }
    // // Delete blog from DB
    // await blogmodel.findByIdAndDelete(_id);
    // return successResponse(res, "blog and associated images deleted");
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
