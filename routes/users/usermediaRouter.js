import { Router } from "express";
import { errorResponse } from "../../helper/serverResponse";

const usermediaRouter = Router();

usermediaRouter.get("/", getallmediaHandler);

export default usermediaRouter;

async function getallmediaHandler(req, res) {
  try {
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
