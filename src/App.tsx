import React from 'react';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quizers/Quiz';
import {Questionable} from './containers/Quizers/interfaces/Questionable'
import {Route,Switch} from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import QuizList from  './containers/QuizList/QuizList';
import QuizCreator from './containers/QuizCreator/QuizCreator'
class App extends React.Component 
{

  render()
  {
    return(
    <Layout>
      <Switch>
        <Route path = "/auth" component ={Auth}/>
        <Route path = "/quiz-creator" component ={QuizCreator}/>
        <Route path = "/quiz/:id" component = {DetailsPage}/>
        <Route path = "/" component ={QuizList}/>
      </Switch>
    </Layout>)
  }

}

export default App;

export class DetailsPage extends React.Component {
  render() {
    return(<Quiz quiz={quizl}></Quiz>)
  }
}

const quizl:Array<Questionable> =
[
  {
    id:0,
    name:"Сколько щупалец у осьминога?",
    rightAnswerId:3,
    answer:[
      {id:0,text:"12"}, 
      {id:1,text:"6"}, 
      {id:2,text:"10"},
      {id:3,text:"8"} 
    ]
  },

  {
    id:1,
    name:"Сколько планет в солнечной системе?",
    rightAnswerId:2,
    answer:[
      {id:0,text:"12"}, 
      {id:1,text:"9"}, 
      {id:2,text:"8"},
      {id:3,text:"7"} 
    ]
  },
  {
    id:2,
    name:"Что такое чистая функция?",
    rightAnswerId:0,
    answer:[
      {id:0,text:"Возвращает одно и то же значение для одного и того же ввода"}, 
      {id:1,text:"Она пустая"}, 
      {id:2,text:"Возвращает разные значения для одного и того же ввода"},
      {id:3,text:"Выполняет принцип SRP"} 
    ]
  }
];