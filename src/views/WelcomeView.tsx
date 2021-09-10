import React from "react";
import { Link } from "react-router-dom";
import { Container, makeStyles, Paper, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  paper: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
  },
}));

export const WelcomeView = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        Welcome to the appointments page. <Link to="/create">Schedule</Link> an
        appointment.
      </Paper>
    </Container>
  );
};
