import express from "express";
import * as path from "path";
import appointmentController from "./appointments/appointment.controller";
import cors from "cors";
// Create the express application
const app = express();
app.use(cors());
// Assign controllers to routes
app.use("/api/appointments", appointmentController);

// Declare the path to frontend's static assets
const CLIENT_BUILD_PATH = path.join(__dirname, "../../client/build");

// Static Files
app.use(express.static(CLIENT_BUILD_PATH));
app.use("/uploads", express.static("uploads"));

// Server React Client
app.get("/", function (req, res) {
  res.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
});

export default app;
