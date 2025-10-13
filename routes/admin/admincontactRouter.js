import { Router } from "express";
import { errorResponse, successResponse } from "../../helper/serverResponse.js";
import contactmodel from "../../model/contactmodel.js";

const admincontactRouter = Router();

admincontactRouter.post("/", getallcontactHandler);
admincontactRouter.post("/create", createcontactHandler);
admincontactRouter.put("/update", updatecontactHandler);
admincontactRouter.delete("/delete", deletecontactHandler);

export default admincontactRouter;

async function getallcontactHandler(params) {
  try {
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function createcontactHandler(req, res) {
  try {
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function updatecontactHandler(req, res) {
  try {
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function deletecontactHandler(req, res) {
  try {
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
