import React from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.scss';
import Input from '../../components/UI/Input/Input';
import {Valid} from './interfaces/Valid';
import {Validate} from './interfaces/Validate';
import {Formable} from './interfaces/Formable';
import validator from 'validator';

export default class Auth extends React.Component
{
  private readonly mimLenght = 6;
  state:Valid = {
    isFormValid:false,
    formControls:{
      email:{ //Create hook 
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Input correct email',
        valid:false,
        touched:false,
        validation:{
          required:true,
          isValid:(param:string)=> this.validOnEmail(param)
        }
      },
      password:{
      value: '',
      type: 'password',
      label: 'Password',
      errorMessage: 'Input correct password',
      valid:false,
      touched:false,
      validation:{
        required:true,
        isValid:(param:string)=> this.validOnLenght(param)
      }},
    },

  }
  loginHandler = () =>
  {

  }
  signUpHandler = () =>
  {
    
  }

  sumbitHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    e.preventDefault();
  }

  validOnEmail = (value:string):boolean =>
  {
    return validator.isEmail(value);
  }

  validOnLenght = (value:string):boolean =>
  {
    return value.length >= this.mimLenght
  }

  validateControl(value:string, validation:Validate)
  {
    if(!validation)
      return true;
    let isValid =true;
    if(validation.required)
    {
      isValid = value.trim()!=='' && isValid;
    }
    return validation.isValid(value) && isValid;
  }

  checkForm(formControls:Formable)
  {
    let isFormValid = true;

    Object.keys(formControls).forEach(name =>{
      isFormValid = formControls[name as keyof Formable].valid && isFormValid
    })
    return isFormValid;
  }


  onChangHandler=(controlName:keyof Formable, event:React.ChangeEvent<HTMLInputElement>)=>
  {
    const formControls ={...this.state.formControls};
    const control ={...formControls[controlName]};
    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value,control.validation);
    formControls[controlName] = control;
    const isFormValid = formControls.email.valid && formControls.password.valid; 
    
    this.setState(
      {
        formControls,isFormValid
      }
    )
  }
  renderInputs()
  {
    return Object.keys(this.state.formControls).map((controlName, index)=>{
      const keyName =controlName as keyof Formable;
      const control=this.state.formControls[keyName];

      return(
        <Input
          key = {controlName+index} 
          inputData = {control}
          shouldValidate = {!!control.validation}
          onChange = {this.onChangHandler.bind(this,keyName)}
        />
      )
    })
  }

  render()
  {
    return(
      <div className={classes.Auth}>
        <div> 
        <h1>Authorization</h1>
        <form onSubmit = {this.sumbitHandler.bind} className ={classes.AuthForm}>
          {this.renderInputs()}
          <Button 
          type ="success" 
          onClick = {this.loginHandler}
          disabled ={!this.state.isFormValid}>LogIn
          </Button>

          <Button 
          type ="success" 
          onClick = {this.signUpHandler}
          >SignUp
          </Button>
        </form>
        </div>
      </div>
    )
  }
}