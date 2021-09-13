import { Schema, model } from "mongoose";

const appointmentSchemaDef = {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
};

const appointmentSchema = new Schema(appointmentSchemaDef);

export default model("Appointment", appointmentSchema);
