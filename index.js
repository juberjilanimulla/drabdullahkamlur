import express from "express";
import cors from "cors";
import morgan from "morgan";
import dbConnect from "./db.js";
import config from "./config.js";

const app = express();
const port = config.PORT;

//Database Connection
dbConnect()
  .then(() => {
    app.listen(() => {
      console.log(`Server is listening at ${port}`);
    });
  })
  .catch((error) => {
    console.log("Unable to connected to Database", error);
  });
