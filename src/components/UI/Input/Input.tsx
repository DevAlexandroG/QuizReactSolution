import classes from './Input.module.scss';
import {Imputly} from './interfaces/Inputly';

function isInvalid(props:Imputly)
{
  return !props.inputData.valid && props.shouldValidate && props.inputData.touched;
}
const Input = (props:Imputly) =>
{
  const inputType = props.inputData.type || 'text';
  const cls = [classes.Input];
  const htmlFor =Math.random().toString();
  // console.log(props,"TAST");
  if(isInvalid(props)){
    cls.push(classes.invalid)
  }
 return(
 <div className = {cls.join(' ')}>
   <label htmlFor ={htmlFor}> {props.inputData.label}
    <input 
      type = {inputType}
      id = {htmlFor}
      value = {props.inputData.value}
      onChange ={props.onChange}>
    </input>
    {isInvalid(props)?
    <span>{props.inputData.errorMessage || 'Input correct value'}</span>:null}
   </label>
 </div>)
}

export default Input;

