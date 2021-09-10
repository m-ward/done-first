import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Paper,
  TextField,
  Theme,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { useCreateAppointment } from "../services/appointments/useCreateAppointment";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  paper: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
  },
  buttonContainer: {
    display: "flex",
    flex: "1 1 100%",
    justifyContent: "flex-end",
  },
}));

interface CreateAppointmentFormState {
  email: string;
  error: boolean;
  firstName: string;
  lastName: string;
  time: string;
  dob: string;
  phone: string;
  address: string;
  photo: string;
}

export const CreateAppointmentForm: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const createAppointment = useCreateAppointment();
  const [values, setValues] = useState<CreateAppointmentFormState>({
    email: "",
    error: false,
    firstName: "",
    lastName: "",
    time: "",
    dob: "",
    phone: "",
    address: "",
    photo: "",
  });

  const handleSubmit = () => {
    createAppointment
      .mutateAsync({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        time: values.time,
        dob: values.dob,
        phone: values.phone,
        address: values.address,
        photo: values.photo,
      })
      .then(() => history.push("/"));
  };
  const handleChange =
    (prop: keyof CreateAppointmentFormState) =>
    (event: ChangeEvent<HTMLTextAreaElement>) =>
      setValues({
        ...values,
        [prop]: event.target.value,
      });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Paper component="div" elevation={3} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            label="Email"
            value={values.email}
            className={clsx(classes.margin, classes.textField)}
            onChange={handleChange("email")}
          />
          <TextField
            label="First Name"
            value={values.firstName}
            className={clsx(classes.margin, classes.textField)}
            onChange={handleChange("firstName")}
          />
          <TextField
            label="Last Name"
            value={values.lastName}
            className={clsx(classes.margin, classes.textField)}
            onChange={handleChange("lastName")}
          />
          <TextField
            label="Time"
            value={values.time}
            className={clsx(classes.margin, classes.textField)}
            onChange={handleChange("time")}
          />
          <TextField
            label="Date of Birth"
            value={values.dob}
            className={clsx(classes.margin, classes.textField)}
            onChange={handleChange("dob")}
          />
          <TextField
            label="Phone"
            value={values.phone}
            className={clsx(classes.margin, classes.textField)}
            onChange={handleChange("phone")}
          />
          <TextField
            label="Address"
            value={values.address}
            className={clsx(classes.margin, classes.textField)}
            onChange={handleChange("address")}
          />
          <TextField
            label="Photo"
            value={values.photo}
            className={clsx(classes.margin, classes.textField)}
            onChange={handleChange("photo")}
          />
          <div className={clsx(classes.buttonContainer, classes.margin)}>
            <Button onClick={() => history.goBack()}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Sign Up
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};
