import React from "react";
import { AppointmentTable } from "../components/AppointmentTable";
import { useAppointments } from "../services/appointments/useAppointments";

export const AdminView = () => {
  const { data, isLoading, isError } = useAppointments();
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "DOB",
            accessor: "dob",
          },
          {
            Header: "Email",
            accessor: "email",
          },
          {
            Header: "Time",
            accessor: "time",
          },
          { Header: "Photo", accessor: "photo" },
        ],
      },
    ],
    []
  );
  if (isLoading) return <div>Is Loading...</div>;
  if (isError) return <div>Is Error...</div>;
  return (
    <div>
      <AppointmentTable columns={columns} data={data} />
    </div>
  );
};
