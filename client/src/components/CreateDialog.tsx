import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { AddCircleOutlined } from "@material-ui/icons";
import { CreateAppointmentForm } from "./CreateAppointmentForm";
import { Container, Tooltip } from "@material-ui/core";
import { Formik, FormikHelpers, FormikValues } from "formik";
import * as yup from "yup";
import { useCreateAppointment } from "../services/appointments/useCreateAppointment";

export type FormValues = {
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
    .max(2, "Only state abbreviations allowed")
    .required("State is required"),
  zip: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .max(5, "Please enter a valid 5 digit zip code")
    .min(5, "Please enter a valid 5 digit zip code")
    .required("Zipcode is required"),
  photo: yup.string(),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CreateDialog = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const createAppointment = useCreateAppointment();

  const handleSubmit = async (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    let data = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      data.set(key, value);
    });
    await createAppointment.mutateAsync(data);
    handleClose(formikHelpers.resetForm);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (resetForm: () => void): void => {
    resetForm();
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="New Appointment">
        <IconButton
          size="medium"
          style={{ color: "white" }}
          onClick={handleClickOpen}
        >
          <AddCircleOutlined />
        </IconButton>
      </Tooltip>
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
          resetForm,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
          setFieldValue,
        }) => (
          <Dialog
            fullScreen
            open={open}
            onClose={() => handleClose(resetForm)}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Container maxWidth="md">
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => handleClose(resetForm)}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    New Appointment
                  </Typography>
                  <Button autoFocus color="inherit" onClick={submitForm}>
                    save
                  </Button>
                </Toolbar>
              </Container>
            </AppBar>
            <Container>
              <CreateAppointmentForm
                submitForm={submitForm}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                touched={touched}
                errors={errors}
                setFieldValue={setFieldValue}
              />
            </Container>
          </Dialog>
        )}
      </Formik>
    </div>
  );
};
