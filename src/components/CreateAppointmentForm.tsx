import React, { useState } from "react";
import "date-fns";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { useCreateAppointment } from "../services/appointments/useCreateAppointment";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { FormikValues, Formik, Form } from "formik";
import * as yup from "yup";
import { states } from "../config/states";
import MaskedInput from "react-text-mask";
import { AddAPhoto } from "@material-ui/icons";

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
  stateSelect: {
    width: "8ch",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  dateContainer: {
    display: "flex",
    flex: "1 1 auto",
    justifyContent: "space-between",
  },
  dateField: {
    width: "25ch",
  },
  paper: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
  },
  buttonContainer: {
    display: "flex",
    flex: "1 1 auto",
    justifyContent: "flex-end",
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  time: Date;
  dob: Date;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  photo: string;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  firstName: yup
    .string()
    .max(15, "First name can be a max of 15 characters")
    .required("First name is required"),
  lastName: yup.string().max(15).required("Last name is required"),
  time: yup.date().required("Appoint time is required"),
  dob: yup.date().required("Birthdate is required"),
  phone: yup
    .string()
    .matches(
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
      "Please enter a valid phone number"
    )
    .required("Phone number is required"),
  address: yup.string().required("Street address is required"),
  city: yup.string().required("City is required"),
  state: yup
    .string()
    .max(2, "Only state Abbriviations allowed")
    .required("State is required"),
  zip: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .max(5, "Please enter a valid 5 digit zip code")
    .min(5, "Please enter a valid 5 digit zip code")
    .required("Zipcode is required"),
  photo: yup.string(),
});

export const CreateAppointmentForm: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const createAppointment = useCreateAppointment();
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const handleSubmit = (values: FormikValues) => {
    console.log(values);
    let data = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      console.log(key);
      console.log(value);
      data.set(key, value);
    });
    console.log(data);
    createAppointment.mutateAsync(data).then(() => history.push("/"));
  };

  interface TextMaskCustomProps {
    inputRef: (ref: HTMLInputElement | null) => void;
  }

  function TextMaskCustom(props: TextMaskCustomProps) {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={(ref: any) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[
          "(",
          /[1-9]/,
          /\d/,
          /\d/,
          ")",
          " ",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
        placeholderChar={"\u2000"}
        showMask
      />
    );
  }

  return (
    <Container maxWidth="md">
      <Formik<FormValues>
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          time: new Date(),
          dob: new Date(),
          phone: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          photo: "",
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          submitForm,
          handleReset,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
          setFieldValue,
        }) => (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }}
              className={classes.root}
            >
              <Paper component="div" elevation={3} className={classes.paper}>
                <Typography variant="h4">Contact Info</Typography>
                <Grid container justifyContent={"space-between"}>
                  <Grid item md={12}>
                    <TextField
                      label="First Name"
                      id="firstName"
                      name="firstName"
                      value={values.firstName}
                      className={clsx(classes.margin, classes.textField)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                    <TextField
                      label="Last Name"
                      id="lastName"
                      name="lastName"
                      value={values.lastName}
                      className={clsx(classes.margin, classes.textField)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                    <Grid item>
                      <Box
                        display="flex"
                        textAlign="center"
                        justifyContent="center"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Avatar src={avatarPreview} className={classes.large}>
                          <AddAPhoto />
                        </Avatar>

                        <Button
                          variant="contained"
                          component="label"
                          startIcon={<AddAPhoto />}
                        >
                          Choose Avatar
                          <input
                            accept="image/*"
                            // className={classes.input}
                            id="photo"
                            type="file"
                            hidden
                            onChange={(event) => {
                              let reader = new FileReader();
                              let file = event?.target?.files?.[0];
                              reader.onloadend = () => {
                                setFieldValue("photo", file);
                                setAvatarPreview(reader.result as string);
                              };
                              file && reader.readAsDataURL(file);
                            }}
                          />
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                  <KeyboardDatePicker
                    variant="inline"
                    format="MM/dd/yyyy"
                    className={clsx(classes.margin, classes.dateField)}
                    id="dob"
                    name="dob"
                    label="Birthdate"
                    value={values.dob}
                    onChange={(value) => setFieldValue("dob", value)}
                    onBlur={handleBlur}
                    error={touched.dob && Boolean(errors.dob)}
                    helperText={touched.dob && errors.dob}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label="Email"
                    id="email"
                    name="email"
                    value={values.email}
                    className={clsx(classes.margin, classes.textField)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item md={12}>
                  <FormControl
                    className={clsx(classes.formControl)}
                    error={Boolean(errors.phone)}
                  >
                    <InputLabel htmlFor="phone">Phone Number</InputLabel>
                    <Input
                      value={values.phone}
                      onChange={(e) => {
                        return handleChange(e);
                      }}
                      onBlur={handleBlur}
                      name="phone"
                      id="phone"
                      inputComponent={TextMaskCustom as any}
                      error={touched.phone && Boolean(errors.phone)}
                    />
                    <FormHelperText error>
                      {touched.phone && errors.phone}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label="Street Address"
                    id="address"
                    name="address"
                    value={values.address}
                    className={clsx(classes.margin, classes.textField)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <TextField
                    label="City"
                    id="city"
                    name="city"
                    value={values.city}
                    className={clsx(classes.margin, classes.textField)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </Grid>
                <Grid item>
                  <FormControl
                    className={clsx(classes.formControl, classes.stateSelect)}
                    error={Boolean(errors.state)}
                  >
                    <InputLabel htmlFor="state-select" id="state-select-label">
                      State
                    </InputLabel>
                    <Select
                      labelId="state-select-label"
                      id="state-select"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {Object.keys(states).map((state) => (
                        <MenuItem value={state}>{state}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error>
                      {touched.state && errors.state}
                    </FormHelperText>
                  </FormControl>
                  <TextField
                    label="Zip Code"
                    id="zip"
                    name="zip"
                    value={values.zip}
                    className={clsx(classes.margin, classes.textField)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.zip && Boolean(errors.zip)}
                    helperText={touched.zip && errors.zip}
                  />
                </Grid>
              </Paper>
              <Paper
                component="div"
                elevation={3}
                className={clsx(classes.dateContainer, classes.paper)}
              >
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  <Grid item>
                    <KeyboardDateTimePicker
                      variant="inline"
                      format="MM/dd/yyyy HH:mm a"
                      className={clsx(classes.margin, classes.dateField)}
                      // margin="normal"
                      id="time"
                      name="time"
                      label="Appointment Date"
                      value={values.time}
                      onChange={(value) => setFieldValue("time", value)}
                      onBlur={handleBlur}
                      error={touched.time && Boolean(errors.time)}
                      helperText={touched.time && errors.time}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <div className={classes.buttonContainer}>
                      <Button onClick={handleReset}>Reset</Button>
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Form>
          </MuiPickersUtilsProvider>
        )}
      </Formik>
    </Container>
  );
};
