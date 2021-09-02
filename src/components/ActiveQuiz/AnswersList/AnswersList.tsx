import React from "react";
import classes from "./AnswersList.module.scss";
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList  = (props:any) =>
{
  return (
    <ul className = {classes.AnswersList}>
      {props.answers.map((answer:any,index:number)=>
      {
        if(props.state?.id===answer.id)
             var state = props.state.isCorrect;  
        return(
          <AnswerItem 
            key = {index}
            answer = {answer}
            onAnswerClick ={props.onAnswerClick}
            state ={state}>
          </AnswerItem>
        )
      })}
    </ul>
  )
}


export default AnswersList