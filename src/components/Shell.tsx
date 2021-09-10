import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderAppBar } from "./HeaderAppBar";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  mainContainer: {
    maxHeight: "calc(100vh - 128px)",
  },
});

type ShellProps = React.PropsWithChildren<unknown>;

const Shell: React.FC<ShellProps> = (props: ShellProps) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HeaderAppBar />
      {children}
    </div>
  );
};

export default Shell;
