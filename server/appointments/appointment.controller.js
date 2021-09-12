import bodyParser from "body-parser";
import { Router } from "express";
import Appointment from "./appointment.model";
import multer from "multer";
import mongoose from "mongoose";
import { mkdir } from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    mkdir("./uploads/", (err) => {
      cb(null, "./uploads/");
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

const router = Router();

router.route("/").get(async (_, response) => {
  const appointments = await Appointment.find();
  return response.status(200).json(appointments);
});

router.route("/").post(upload.single("photo"), async (request, response) => {
  try {
    const appointment = new Appointment({
      _id: new mongoose.Types.ObjectId(),
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      time: request.body.time,
      dob: request.body.dob,
      phone: request.body.phone,
      email: request.body.email,
      address: request.body.address,
      city: request.body.city,
      state: request.body.state,
      zip: request.body.zip,
      photo: request.file.path,
    });
    await appointment.save();
    return response.status(200).json("Appointment saved!");
  } catch (error) {
    console.log(error);
    return response.status(400).send(error);
  }
});

export default router;
