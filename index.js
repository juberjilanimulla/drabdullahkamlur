import express from "express";
import cors from "cors";
import morgan from "morgan";
import dbConnect from "./db.js";
import config from "./config.js";
import bodyParser from "body-parser";
import authRouter from "./routes/auth/authRouter.js";
import adminRouter from "./routes/admin/adminRouter.js";
import userRouter from "./routes/users/userRouter.js";
import { Admin } from "./helper/helperFunction.js";

const app = express();
const port = config.PORT;

app.set("trust proxy", true);
morgan.token("remote-addr", function (req) {
  return req.headers["x-forwarded-for"] || req.socket.remoteAddress;
});

morgan.token("url", (req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  return req.originalUrl;
});

app.use(
  morgan(
    ":remote-addr :method :url :status :res[content-length] - :response-time ms"
  )
);

//middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "10mb" }));

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON input" });
  }
  next(err); // Pass to the next middleware if not a JSON error
});

//routes
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

//database connected successfullys
//Database Connection
dbConnect()
  .then(() => {
    Admin();
    app.listen(() => {
      console.log(`Server is listening at ${port}`);
    });
  })
  .catch((error) => {
    console.log("Unable to connected to Database", error);
  });
