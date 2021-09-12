import axios from "axios";
import { useMutation } from "react-query";

export type Appointment = {
  firstName: string;
  lastName: string;
  time: Date;
  dob: Date;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  photo: string;
};

export type UnformattedAppointment = {
  firstName: string;
  lastName: string;
  time: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  photo: string;
};

const createAppointment = async (appointment: FormData) => {
  console.log(appointment);
  const res = await axios.post(
    "http://localhost:9000/api/appointments",
    appointment,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res;
};

export const useCreateAppointment = () => {
  return useMutation(
    "appointments",
    async (appointment: FormData) => await createAppointment(appointment)
  );
};
