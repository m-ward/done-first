import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export type Appointment = {
  _id: string;
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
  _id: string;
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

// Note this is not exported.  We want to encourage uniform
// service access through the hooks to ensure we are not bypassing
// the cache.
const createAppointment = async (appointment: FormData) => {
  //TODO: Add this to an .env var
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}api/appointments`,
    appointment,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  //TODO: Implement optimistic update of the cache
  // See [useDeleteAppointments] as an example
  return useMutation(
    "appointments",
    async (appointment: FormData) => await createAppointment(appointment),
    {
      onSettled: () => {
        queryClient.invalidateQueries("appointments");
      },
    }
  );
};
