import axios from "axios";
import { useMutation } from "react-query";

export type Appointment = {
  firstName: string;
  lastName: string;
  time: Date | null;
  dob: Date | null;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  photo: string;
};

const createAppointment = async (appointment: Appointment) => {
  const res = await axios.post(
    "http://localhost:9000/api/appointments",
    appointment
  );
  return res;
};

export const useCreateAppointment = () => {
  return useMutation(
    "appointments",
    async (appointment: Appointment) => await createAppointment(appointment)
  );
};
