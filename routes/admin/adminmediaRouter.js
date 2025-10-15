import { Router } from "express";
import mediamodel from "../../model/mediamodel.js";
import { successResponse, errorResponse } from "../../helper/serverResponse.js";
import adminmediaimageRouter from "./adminuploadmediaimageRouter.js";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const adminmediaRotuer = Router();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

adminmediaRotuer.post("/", getallmediaHandler);
adminmediaRotuer.post("/create", createmediaHandler);
adminmediaRotuer.put("/update", updatemediaHandler);
adminmediaRotuer.delete("/delete", deletemediaHandler);
adminmediaRotuer.use("/upload", adminmediaimageRouter);
adminmediaRotuer.delete("/deleteimage", getdeleteimageHandler);

export default adminmediaRotuer;

async function getallmediaHandler(req, res) {
  try {
    const { pageno = 0, filterBy = {}, sortby = {}, search = "" } = req.body;
    const limit = 10;
    const skip = pageno * limit;

    let query = {};

    // Apply search
    if (search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { title: { $regex: searchRegex } },
        { metadescription: { $regex: searchRegex } },
        { keywords: { $regex: searchRegex } },
        { content: { $regex: searchRegex } },
        { category: { $regex: searchRegex } },
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

    // Fetch paginated medias
    const media = await mediamodel
      .find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    const totalCount = await mediamodel.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    successResponse(res, "successfully", {
      media,
      totalPages,
    });
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
    const { _id } = req.body;
    if (!_id) {
      return errorResponse(res, 400, "media ID (_id) is required");
    }
    // Find property before deletion (to access images)
    const media = await mediamodel.findById(_id);
    if (!media) {
      return errorResponse(res, 404, "media not found");
    }
    // Delete all images from S3
    const s3Key = media.image?.split(".amazonaws.com/")[1];
    if (s3Key) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: s3Key,
        })
      );
    }
    // Delete media from DB
    await mediamodel.findByIdAndDelete(_id);
    return successResponse(res, "media and associated images deleted");
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function getdeleteimageHandler(req, res) {
  try {
    const { _id } = req.body;
    if (!_id) {
      return errorResponse(res, 400, "Media ID (_id) is required");
    }
    const media = await mediamodel.findById(_id);
    if (!media) {
      return errorResponse(res, 404, "media not found");
    }
    const imageUrl = media.image;
    const s3Key = imageUrl?.split(".amazonaws.com/")[1];
    if (s3Key) {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: s3Key,
      });
      await s3.send(deleteCommand);
    }
    media.image = ""; // Clear image reference from DB
    await media.save();
    return successResponse(res, "media image deleted successfully", media);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
