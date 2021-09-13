import axios from "axios";
import { useQuery } from "react-query";
import { Appointment, UnformattedAppointment } from "./useCreateAppointment";

// Note this is not exported.  We want to encourage uniform
// service access through the hooks to ensure we are not bypassing
// the cache.
const getAppointments = async (): Promise<Appointment[]> => {
  //TODO: Add this to an .env var
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/appointments`
  );
  return res.data.map((appointment: UnformattedAppointment) => {
    return {
      ...appointment,
      time: new Date(appointment.time),
      dob: new Date(appointment.dob),
    };
  });
};

export const useAppointments = () => {
  return useQuery<Appointment[]>(
    "appointments",
    async () => await getAppointments()
  );
};
