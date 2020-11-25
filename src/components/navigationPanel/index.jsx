import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  logoff: {
    width: "5vw",
    color: "white",
  },
}));

const NavigationPanel = () => {
  const classes = useStyles();
  const history = useHistory();

  const tryLogOff = () => {
    window.localStorage.clear();

    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Button className={classes.logoff} onClick={tryLogOff}>
          LogOff
        </Button>
      </AppBar>
    </div>
  );
};

export default NavigationPanel;
