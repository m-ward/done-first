import React, { RefObject, useMemo } from "react";
import {
  Checkbox,
  CheckboxProps,
  createStyles,
  makeStyles,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import MaUTable from "@material-ui/core/Table";
import {
  Cell,
  Column,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { Appointment } from "../services/appointments/useCreateAppointment";
import { DataGridToolbar } from "./DataGridToolbar";

const useStyles = makeStyles(() =>
  createStyles({
    mainContainer: {
      maxHeight: "calc(100vh - 64px)",
    },
  })
);

const IndeterminateCheckbox = React.forwardRef<
  HTMLButtonElement,
  CheckboxProps
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef<CheckboxProps>();
  const resolvedRef = (ref as RefObject<CheckboxProps>) ?? defaultRef;

  React.useEffect(() => {
    if (resolvedRef.current) {
      resolvedRef.current.indeterminate = indeterminate;
    }
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <Checkbox ref={resolvedRef.current?.ref} {...rest} />
    </>
  );
});

export const AppointmentTable = ({
  columns,
  data,
  status,
}: {
  columns: Column<Appointment>[];
  data: Appointment[];
  status: "idle" | "error" | "loading" | "success";
}) => {
  const classes = useStyles();
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { selectedRowIds, globalFilter },
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }: Cell) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const selectedRowDBIds = useMemo<string[]>(() => {
    return Object.keys(selectedRowIds).map((id) => data?.[Number(id)]?._id);
  }, [selectedRowIds, data]);

  // Render the UI for your table
  return (
    <TableContainer className={classes.mainContainer}>
      <DataGridToolbar
        status={status}
        selectedRowIds={selectedRowDBIds}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <MaUTable stickyHeader {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...(column.id === "selection"
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}
                >
                  {column.render("Header")}
                  {column.id !== "selection" ? (
                    <TableSortLabel
                      active={column.isSorted}
                      // react-table has a unsorted state which is not treated here
                      direction={column.isSortedDesc ? "desc" : "asc"}
                    />
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
    </TableContainer>
  );
};
