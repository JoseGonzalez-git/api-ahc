//CONFIG SERVER
import express from "express";
import morgan from "morgan";
import cors from "cors";

import { createdRoles } from "./libs/initialSetup";
// Routes
import IndexRouter from "./routes/index.routes";
import pkg from "../package.json";
import authRoutes from "./routes/auth.routes";

const app = express();
createdRoles(); //solo se ejecuta si no hay roles.
//variable- valor
app.set("port", process.env.PORT || 5045);
app.set("pkg", pkg);

app.use(morgan("dev"));
app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
//Routes
app.use("/api/v1", IndexRouter);
app.use("/api/v1/auth", authRoutes);

export default app;
