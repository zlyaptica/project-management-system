require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRouter = require("./router/user-router");
const projectRouter = require("./router/project-router");

const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 5000;

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(errorMiddleware)

app.use('/api/users', userRouter)
app.use('/api/projects', projectRouter)

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`server listen :${PORT} port`));
  } catch (error) {
    console.log(error);
  }
};

start();
