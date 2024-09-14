const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./Middleware/error");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

// config
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);

// Route Imports
const user = require("./Routes/userRoute");
const _class = require("./Routes/classRoute");
const book = require("./Routes/bookRoute");
const chapter = require("./Routes/chapterRoute");
const lecture = require("./Routes/lectureRoute");

app.use("/api/v1/user", user);
app.use("/api/v1/class", _class);
app.use("/api/v1/book", book);
app.use("/api/v1/chapter", chapter);
app.use("/api/v1/lecture", lecture);

//Middleware for Error
app.use(errorMiddleware);

module.exports = app;
