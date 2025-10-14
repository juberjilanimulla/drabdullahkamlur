import express from "express";
import cors from "cors";
import morgan from "morgan";
import dbConnect from "./db.js";
import config from "./config.js";

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

app.use(express());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON input" });
  }
  next(err); // Pass to the next middleware if not a JSON error
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

//routes
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

//database connected successfullys
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
