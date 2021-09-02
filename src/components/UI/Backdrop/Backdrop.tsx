import React from "react";
import classes from './Backdrop.module.scss';

const Backdrop = (props:any) =>
{
  console.log(props);
  return(<div className = {classes.Backdrop} onClick = {props.onClick}></div>)
}

export default Backdrop;