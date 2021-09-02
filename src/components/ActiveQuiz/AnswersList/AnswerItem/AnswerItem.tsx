import React from "react";
import classes from "./AnswerItem.module.scss"

const AnswerItem = (props:any):JSX.Element=>
{
  const cls = [classes.AnswerItem];
  if(props.state !==undefined && props.state  === true)
  {
    cls.push(classes.true)
  }
  else if(props.state !==undefined &&props.state===false)
  {
    cls.push(classes.false)
  }

  return(
  <li 
    className = {cls.join(' ')}
    onClick = {()=>props.onAnswerClick(props.answer.id)}>
    {props.answer.text}
  </li>);
}


export default AnswerItem;