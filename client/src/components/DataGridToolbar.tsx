import {
  alpha,
  AppBar,
  createStyles,
  IconButton,
  lighten,
  LinearProgress,
  makeStyles,
  Theme,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { CreateDialog } from "./CreateDialog";
import { GlobalFilter, GlobalFilterProps } from "./GlobalFilter";
import clsx from "clsx";
import { useDeleteAppointments } from "../services/appointments/useDeleteAppointments";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    toolbarTitle: {
      flex: "1 1 100%",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
  })
);

export type DataGridToolbarProps = {
  selectedRowIds: string[];
  status: "idle" | "error" | "loading" | "success";
} & GlobalFilterProps;

export const DataGridToolbar: React.FC<DataGridToolbarProps> = ({
  status,
  selectedRowIds,
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const classes = useStyles();
  const { mutateAsync } = useDeleteAppointments();

  const numSelected = selectedRowIds.length;
  const handleDelete = async () => {
    mutateAsync(selectedRowIds);
  };

  return (
    <AppBar position="fixed">
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <CreateDialog />
        {numSelected > 0 ? (
          <Typography
            className={classes.toolbarTitle}
            color="inherit"
            variant="subtitle1"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            className={classes.toolbarTitle}
            variant="h6"
            id="tableTitle"
          >
            Appointments
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  );
};
