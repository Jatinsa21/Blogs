import classes from "./Alert.module.css";
import React from "react";

export default function Alert({ alert, Mesg }) {
  return (
    <>
      <div className={classes.main}>
        <div className={classes.alert}>
          <h3>{Mesg}</h3>
          <p>{alert}</p>
        </div>
      </div>
    </>
  );
}
