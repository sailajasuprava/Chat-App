require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appArror");
const authRouter = require("./routes/authRoutes");
const messageRouter = require("./routes/messageRoutes");
const userRouter = require("./routes/userRoutes");

const port = process.env.PORT || 3000;
const DB = process.env.DB_URL;

const app = express();

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log("ERROR", err));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`This route ${req.originalUrl} doesn't exist.`, 404));
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
