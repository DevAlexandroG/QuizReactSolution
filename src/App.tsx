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
    name:"Какого цвета небо?",
    rightAnswerId:1,
    answer:[
      {id:0,text:"Черный"}, 
      {id:1,text:"Синий"}, 
      {id:2,text:"Красный"},
      {id:3,text:"Зеленый"} 
    ]
  },

  {
    id:1,
    name:"В каком году основали Санкт-Петербург?",
    rightAnswerId:3,
    answer:[
      {id:0,text:"1700"}, 
      {id:1,text:"1702"}, 
      {id:2,text:"1701"},
      {id:3,text:"1703"} 
    ]
  }
];