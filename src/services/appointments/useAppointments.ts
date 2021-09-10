import axios from "axios";
import { useQuery } from "react-query";

const getAppointments = async () => {
  const res = await axios.get("http://localhost:9000/api/appointments");
  console.log(res);
  return res.data;
};

export const useAppointments = () => {
  return useQuery("appointments", async () => getAppointments());
};
