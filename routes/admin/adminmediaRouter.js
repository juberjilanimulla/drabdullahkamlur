import { Router } from "express";
import { errorResponse, successResponse } from "../../helper/serverResponse.js";
import mediamodel from "../../model/mediamodel.js";

const adminmediaRouter = Router();

adminmediaRouter.post("/", getallmediaHandler);
adminmediaRouter.post("/create", createmediaHandler);
adminmediaRouter.put("/update", updatemediaHandler);
adminmediaRouter.delete("/delete", deletemediaHandler);
adminmediaRouter.use("/mediaimage");

export default adminmediaRouter;

async function getallmediaHandler(req, res) {
  try {
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function createmediaHandler(req, res) {
  try {
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function updatemediaHandler(req, res) {
  try {
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
