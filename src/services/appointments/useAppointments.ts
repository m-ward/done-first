import axios from "axios";
import { useQuery } from "react-query";
import { Appointment, UnformattedAppointment } from "./useCreateAppointment";

const getAppointments = async (): Promise<Appointment[]> => {
  const res = await axios.get("http://localhost:9000/api/appointments");
  const formattedDatesRes = res.data.map(
    (appointment: UnformattedAppointment) => {
      return {
        ...appointment,
        time: new Date(appointment.time),
        dob: new Date(appointment.dob),
      };
    }
  );
  console.log(res);
  return formattedDatesRes;
};

export const useAppointments = () => {
  return useQuery<Appointment[]>(
    "appointments",
    async () => await getAppointments()
  );
};
