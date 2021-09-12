import React from "react";
import { AppointmentTable } from "../components/AppointmentTable";
import { useAppointments } from "../services/appointments/useAppointments";
import { Cell } from "react-table";
import { Appointment } from "../services/appointments/useCreateAppointment";
import { Avatar } from "@material-ui/core";

export const AdminView = () => {
  const { data, isLoading, isError } = useAppointments();
  const columns = React.useMemo(
    () => [
      {
        Header: "Photo",
        accessor: "photo",
        Cell: ({ value }: { value: string }) => {
          let url;
          if (value.includes("uploads")) {
            url = `http://localhost:9000/${value}`;
          } else {
            url = value;
          }
          return <Avatar src={url} />;
        },
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "DOB",
        id: "dob",
        accessor: (original: Appointment) => new Date(original.dob),
        Cell: ({ value }: Cell) => {
          return value.toLocaleDateString("en-us", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        },
        sortType: "datetime",
      },
      {
        Header: "Time",
        id: "time",
        accessor: (original: Appointment) => new Date(original.time),
        Cell: ({ value }: Cell) => {
          const dateString = value.toLocaleDateString("en-us", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          const timeString = value.toLocaleTimeString();

          return `${dateString}, ${timeString}`;
        },
        sortType: "datetime",
      },
      { Header: "Address", accessor: "address" },
      { Header: "City", accessor: "city" },
      { Header: "State", accessor: "state" },
      { Header: "Zip", accessor: "zip" },
      {
        Header: "Email",
        accessor: "email",
      },
      { Header: "Phone", accessor: "phone" },
    ],
    []
  );
  if (isLoading) return <div>Is Loading...</div>;
  if (isError) return <div>Is Error...</div>;
  return (
    <div>
      {/*// @ts-ignore*/}
      <AppointmentTable columns={columns} data={data || []} />
    </div>
  );
};
