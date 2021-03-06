import React from "react";
import classes from "./ActiveQuize.module.scss";
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = (props:any) =>
{
  console.log(props.state,"ActiveQuiz");
  return  (
    <div className = {classes.ActiveQuize}>
      <p className = {classes.Question}>
        <span>
          <strong>{props.answerNumber}.</strong>&nbsp;
          {props.question}
        </span>
        <small> {props.answerNumber} из {props.quizLength}</small>
      </p>
      <AnswersList 
        state = {props.state}
        answers = {props.answers}
        onAnswerClick = {props.onAnswerClick}>
      </AnswersList>
    </div>
)
  }
export default ActiveQuiz;