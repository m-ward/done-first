import React, { useState } from "react";
import "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import clsx from "clsx";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Form, FormikTouched } from "formik";
import { states } from "../config/states";
import MaskedInput from "react-text-mask";
import { AddAPhoto } from "@material-ui/icons";
import { FormValues } from "./CreateDialog";
import { FormikErrors } from "formik/dist/types";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
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
    width: "4ch",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60,
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
  zipCodeField: {
    width: "6ch",
  },
  large: {
    width: "150px",
    height: "150px",
    marginBottom: theme.spacing(1),
  },
}));

//TODO: Figure out why typescript doesn't like me using Pick for these functions
export type CreateAppointmentFormProps = {
  submitForm: () => Promise<void>;
  handleChange: {
    /** Classic React change handler, keyed by input name */
    (e: React.ChangeEvent<any>): void;
    /** Preact-like linkState. Will return a handleChange function.  */
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  handleBlur: {
    /** Classic React blur handler, keyed by input name */
    (e: React.FocusEvent<any>): void;
    /** Preact-like linkState. Will return a handleBlur function. */
    <T = string | any>(fieldOrEvent: T): T extends string
      ? (e: any) => void
      : void;
  };
  values: FormValues;
  touched: FormikTouched<FormValues>;
  errors: FormikErrors<FormValues>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

export const CreateAppointmentForm: React.FC<CreateAppointmentFormProps> = ({
  submitForm,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  setFieldValue,
}) => {
  const classes = useStyles();
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  interface TextMaskCustomProps {
    inputRef: (ref: HTMLInputElement | null) => void;
  }

  const TextMaskCustom = (props: TextMaskCustomProps) => {
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
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
        className={classes.root}
      >
        <Card component="div" elevation={3} className={classes.paper}>
          <CardContent>
            <Grid container justifyContent="space-around">
              <Grid item>
                <Box
                  display="flex"
                  textAlign="center"
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Avatar
                    variant="rounded"
                    src={avatarPreview}
                    className={classes.large}
                  >
                    <AddAPhoto />
                  </Avatar>

                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<AddAPhoto />}
                  >
                    Upload Photo
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
          </CardContent>
          <CardContent>
            <Container maxWidth={"sm"}>
              <Grid container xs={12} justifyContent="flex-start">
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
              </Grid>
              <Grid container justifyContent={"flex-start"}>
                <Grid item>
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
                </Grid>
                <Grid item>
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
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-start">
                <Grid item>
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
                <Grid item>
                  <FormControl
                    className={clsx(
                      classes.formControl,
                      classes.margin,
                      classes.textField
                    )}
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
              </Grid>
              <Grid container>
                <Grid item>
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
              </Grid>
              <Grid container>
                <Grid item>
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
                </Grid>
                <Grid item>
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
                </Grid>
                <Grid item>
                  <TextField
                    label="Zip"
                    id="zip"
                    name="zip"
                    value={values.zip}
                    className={clsx(classes.margin, classes.zipCodeField)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.zip && Boolean(errors.zip)}
                    helperText={touched.zip && errors.zip}
                  />
                </Grid>
              </Grid>
            </Container>
          </CardContent>
        </Card>
        {/*<Paper*/}
        {/*  component="div"*/}
        {/*  elevation={3}*/}
        {/*  className={clsx(classes.dateContainer, classes.paper)}*/}
        {/*>*/}
        {/*  <Grid*/}
        {/*    container*/}
        {/*    justifyContent="space-between"*/}
        {/*    alignItems={"center"}*/}
        {/*  >*/}
        {/*    <Grid item>*/}
        {/*      <div className={classes.buttonContainer}>*/}
        {/*        <Button onClick={handleReset}>Reset</Button>*/}
        {/*        <Button type="submit" variant="contained" color="primary">*/}
        {/*          Submit*/}
        {/*        </Button>*/}
        {/*      </div>*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*</Paper>*/}
      </Form>
    </MuiPickersUtilsProvider>
  );
};
