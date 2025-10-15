import { Router } from "express";
import mediamodel from "../../model/mediamodel.js";
import { successResponse, errorResponse } from "../../helper/serverResponse.js";

const adminmediaRotuer = Router();

adminmediaRotuer.post("/", getallmediaHandler);
adminmediaRotuer.post("/create", createmediaHandler);
adminmediaRotuer.put("/update", updatemediaHandler);
adminmediaRotuer.delete("/delete", deletemediaHandler);

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
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
