import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: "center",
  },
}));

export const HeaderAppBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justify="space-between">
            <Grid item xs={3} className={classes.title}>
              <Typography variant="h6">Appointments</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* second toolbar for margin*/}
    </div>
  );
};
