import React from "react";
import classes from './FinishedQuiz.module.scss';
import {Quizible} from '../../containers/Quizers/interfaces/Quizible'
import {quizState} from '../../containers/Quizers/Quiz';
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom"; 

const symbolCheck = "fa-check";
const symbolTimes = "fa-times";

const FinishedQuiz:React.FC<any>=(props)=>
{
  return(
    <div className = {classes.FinishedQuiz}>
      <ul>
       {props.quiz.map((quizItem:any,index:number)=>
       {
        const isCorrect = props.checkAnswers(props.dictionaryResult[quizItem.id]);
        const className = getStyle(isCorrect);
        return getComponent({quizItem, index, className});
       })}
      </ul>
      <p>Правильно {props.successCount} из {props.quiz.length}</p>
      <div>
        <Button onClick= {props.retryQuiz} type="primary">Повторить</Button>
        <Link to ="/"> 
        <Button type="success">Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  )
}
export default FinishedQuiz;

function getStyle(isCorrectAnswer:boolean)
{
  if(isCorrectAnswer)
    return ['fa', symbolCheck, classes["true"]];
  return ['fa', symbolTimes, classes["false"]];
}

function getComponent(quizSection:quizibleSection)
{
   return(
     <li
       key={quizSection.index}>
         <strong>{quizSection.index+1}</strong>.&nbsp;
         {quizSection.quizItem.name}
         <i className = {quizSection.className.join(' ')}></i>
     </li>
   )
}


interface quizibleSection
{
  quizItem: any,
  index: number,
  className: Array<string>
}

export interface finishableQuiz extends  quizState,Quizible
{
  
}
