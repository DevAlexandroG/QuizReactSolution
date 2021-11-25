import React from "react";
import classes from './Quiz.module.scss'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import {Quizible} from './interfaces/Quizible';
import { withRouter } from "react-router-dom";

type userAnswers=[id:number|null,isCorrect:boolean|null];

class Quiz extends React.Component<Quizible>
{
  private userCache:Cacheable ={
    userAnswers:[null,null]
  }

  constructor(props:Quizible)
  {
    super(props);
    console.log("testQuiz",props.match.params);
  }

  state:quizState = 
  {
      successCount:0,
      dictionary:[[null,null]],
      isFinished:false,
      activeQuestion:0,
      answerState:null,
  }

  onAnswerClickHandler = (answerId:number) =>
  {
    if(this.state.answerState)
    {
      if(this.state.answerState.isCorrect)
        return true; 
    }
    this.responseProcessing(answerId);
  }

  responseProcessing(answerId:number)
  {
    const question = this.props.quiz[this.state.activeQuestion]
    if(question.rightAnswerId===answerId)
    {
      this.initState(answerId,true);
      this.runTimeOut();
    }
    else
    {
      this.initState(answerId,false);
    }
  }

  initState(answerId:number,isCorrectAnswer:boolean)
  {
    this.userCache.userAnswers[answerId] = isCorrectAnswer;
    this.setState({
      answerState: {id:answerId,isCorrect:isCorrectAnswer},
      dictionary:{...this.state.dictionary,[this.state.activeQuestion]:[...this.userCache.userAnswers]} 
    })
  }

  runTimeOut()
  {
    const timeout = window.setTimeout(()=>
    {
      this.isQuizFinished()?this.setState({isFinished:true, successCount:this.getCountCorrectAnswers()}):this.nextQustion()
      window.clearTimeout(timeout);
    },1000)
  }

  isQuizFinished()
  {
    return this.state.activeQuestion + 1 === this.props.quiz.length
  }

  getCountCorrectAnswers = () =>
  {
    let count = 0;
    for (let index = 0; index < this.props.quiz.length; index++)
    {
      if(this.checkAnswers(this.state.dictionary[index]))
        count++;
    }
    return count;
  }

  nextQustion()
  {
    this.userCache.userAnswers = [null,null];
    this.setState(
      {
        activeQuestion: this.state.activeQuestion +1,
        answerState:null,
      })
  }

  checkAnswers(finalListAnswers:[index:number|null,flag:boolean|null])
  {
    for (let index = 0; index < finalListAnswers.length; index++)
    {
      if(finalListAnswers[index]===false)
        return false
    }
    return true;
  }

  getFinishidComponent = () =>
  {
    return (
    <FinishedQuiz
        quiz = {this.props.quiz}
        dictionaryResult ={this.state.dictionary}
        successCount={this.state.successCount}
        retryQuiz={this.retryQuiz}
        checkAnswers={this.checkAnswers}
      ></FinishedQuiz>
      )
  }

  retryQuiz = () =>
  {
    this.userCache.userAnswers = [null,null];
    this.setState(
      {
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        dictionary:[[null,null]]
      }
    )
  }
  componentDidMount()
  {
    console.log("Quiz Id = ",this.props)
  }
  render()
  {
    return(
      <div className = {classes.Quiz}>
        <div className = {classes.QuizWrapper}>
          <h1>Answer the questions</h1>
        {this.state.isFinished?
          this.getFinishidComponent()
          :<ActiveQuiz answers = {this.props.quiz[this.state.activeQuestion].answer}
                      question = {this.props.quiz[this.state.activeQuestion].name}
                      onAnswerClick = {this.onAnswerClickHandler}
                      quizLength = {this.props.quiz.length}
                      answerNumber = {this.state.activeQuestion  +1 }
                      state = {this.state.answerState}></ActiveQuiz>  
        }
        </div>
      </div>
    )
  }
}
export default withRouter(Quiz);
interface Cacheable
{
   userAnswers:userAnswers
}

export interface quizState 
{
  successCount:number,
  dictionary:Record<number,[id:number|null,isCorrect:boolean|null]>
  isFinished:boolean,
  activeQuestion:number;
  answerState:
  {
    id:number,
    isCorrect:boolean
  }|null;
}
