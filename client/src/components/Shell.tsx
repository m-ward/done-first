import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

type ShellProps = React.PropsWithChildren<unknown>;

//TODO: Probably get rid of this.  This will be handy in the future
// if we need to have more globally available ui (ie modals, drawers, etc)
const Shell: React.FC<ShellProps> = (props: ShellProps) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar />
      {children}
    </div>
  );
};

export default Shell;
