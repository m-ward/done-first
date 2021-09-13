import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Appointment } from "./useCreateAppointment";

// Note this is not exported.  We want to encourage uniform
// service access through the hooks to ensure we are not bypassing
// the cache.
const deleteAppointments = async (ids: string[]) => {
  const response = await axios.post(
    "http://localhost:8080/api/appointments/batch/delete",
    {
      records: ids,
    }
  );

  return response.data;
};

export const useDeleteAppointments = () => {
  const queryClient = useQueryClient();
  return useMutation(
    "deleteAppointments",
    async (ids: string[]) => await deleteAppointments(ids),
    {
      onMutate: async (ids) => {
        await queryClient.cancelQueries("appointments");
        const previousValue = queryClient.getQueryData("appointments");
        queryClient.setQueryData(
          "appointments",
          (old: Appointment[] | undefined) => {
            return (
              old?.filter((appointment) => !ids.includes(appointment._id)) || []
            );
          }
        );

        return previousValue;
      },
      onError: (err, variables, previousValue) => {
        queryClient.setQueryData("appointments", previousValue);
      },
      onSettled: () => {
        queryClient.invalidateQueries("appointments");
      },
    }
  );
};
