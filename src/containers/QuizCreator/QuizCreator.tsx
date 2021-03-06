import React from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import  classes  from './QuizCreator.module.scss';
import {createControl,controlOption,validate,validateForm} from  '../../form/formFramework';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import {Authorizable} from '../../containers/Auth/interfaces/Authorizable';
import Select from '../../components/UI/Select/Select';

function getLabel(label:string,id:number)
{
  return `${label} ${id}`; 
}

function createOptionControl(partAuthorizableForm:Partial<Authorizable>,id:number)
{
  return createControl({
    ...partAuthorizableForm,
      errorMessage:`${partAuthorizableForm.errorMessage} does not be empty`,
      id:id
  }, {required: true,isValid:valid})
}
const labelForOption = "Options";
const labelForQuestion ='Input question';

enum ControlType{
  question ="Question",
  option = "Option"
}

function arrayToRecordControls(controls:Array<controlOption>)
{
  let controlRecord:Record<number,controlOption>={};
  controls.forEach(element =>
  {
    controlRecord[element.id]=element;
  })
  return controlRecord;
}

function getOptionByType(controlType:ControlType,index:number)
{
  let optionControl:controlOption;
  console.log(controlType,"controlType");
  if(controlType===ControlType.question)
  {
    optionControl = createOptionControl({label:labelForQuestion,errorMessage:controlType},index);
  }
  else 
  {
    optionControl = createOptionControl({label:getLabel(labelForOption,index),errorMessage:controlType},index);
  }
  return  optionControl;
}

function getControlOptions(count:number,haveStartElement:boolean):Map<string, controlOption>
{
  let controlOptions = new Map<string, controlOption>();

  for (let index:number = 0; index <= count; index++) 
  {
    let optionControl:controlOption;
    if(haveStartElement)
    {
      optionControl = getOptionByType(ControlType.question,index);
      controlOptions.set(`${ControlType.question}`,optionControl);
      haveStartElement = false;
    }
    else
    {
      optionControl = getOptionByType(ControlType.option,index);
      controlOptions.set(`${ControlType.option} ${index}`,optionControl);
    }
  }
  return controlOptions;
}

function valid()
{
  return true;
}

export default class QuizCreator extends React.Component
{
  state ={
    quiz:[],
    formControls:getControlOptions(4,true),
    rightAnswerId:1,
    isFormValid: false
  }

  submitHandler = (event:React.ChangeEvent<HTMLInputElement>) =>
  {
    event.preventDefault();
  }

  addQuestionHandler = (event:React.ChangeEvent<HTMLInputElement>) =>
  {
    event.preventDefault();

    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;

    const questionItem = {
    }
  }
  createQuizHandler = () =>
  {

  }

  getControlAfterTouch(controlOption:controlOption,value:string)
  {
    console.log(controlOption,"controlOption");
    const control = {...controlOption};
    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);
    return control;
  }

  getControlOptionByKey(key:string)
  {
    let val;
    if(val = this.state.formControls.get(key))
    {
      return{...val};
    } 
    return createOptionControl({},0);
  }


  changeHandler = (key:string, value:string)=>  
  {
    let formControls = new Map<string, controlOption>();
    this.state.formControls.forEach((control,keyName)=>
    {
      if(keyName==key)
      {
        const control = this.getControlAfterTouch(this.getControlOptionByKey(key),value);
        formControls.set(key,control);
      }
      else
        formControls.set(keyName,control);
    })
    console.log(formControls,"testFormControls");

   
    this.setState({
      formControls,
    })

  }

  renderControls(){
    let index=0;
    const inputElements:JSX.Element[]=[];
    this.state.formControls.forEach((control,key)=>
    {
      const inputElement= (
        <Auxiliary key = {control.label + index}>
         <Input
          inputData = {control}
          shouldValidate ={!!control.validation}
          onChange = {(event:React.ChangeEvent<HTMLInputElement>)=>this.changeHandler(key,event.target.value)}
        />
        {index===0?<hr/>:null}
         </Auxiliary>
      )
      index++;
      inputElements.push(inputElement);
    })
    return inputElements;
  }

  selectChangeHandler = (event:React.ChangeEvent<HTMLInputElement>)=>
  {
    this.setState({
      rightAnswerId: + event.target.value
    })
  }

  getSelect()
  {
    return (
    <Select
      labe ="Choose right answer"
      value = {this.state.rightAnswerId}
      onChange = {this.selectChangeHandler}
      options = {[
        {text:1,value:1},
        {text:2,value:2},
        {text:3,value:3},
        {text:4,value:4}
      ]}>
    </Select>
    )
  }

  render(){
    return(
      <div className = {classes.QuizCreator}>
        <div>
          <h1>Quiz creator</h1>
          <form onSubmit ={this.submitHandler.bind}>
            {this.renderControls()}
            {this.getSelect()}
            <Button 
            type ="primary"
            onClick ={this.addQuestionHandler}
            disabled = {!this.state.isFormValid}>Add question
            </Button>
            <Button
            type ="success"
            onClick = {this.createQuizHandler}
            disabled = {this.state.quiz.length === 0}>Create test
            </Button>

          </form>
        </div>
      </div>
    )
  }
}