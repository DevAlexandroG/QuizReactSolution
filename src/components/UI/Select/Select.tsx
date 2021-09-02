import React from 'react';
import classes from './Select.module.scss';

function getOptions(options:any)
{
  // console.log(options,"opt");
  return options.map((option:any,index:number)=>{
    return(
      <option
       value ={option.value}
       key = {option.value + index}
       >
        {option.text}
      </option>
    )
  })
}

const Select = (props:any) =>
{
  // console.log(props,"propsSelect");
  const htmlFor = `${props.label} -${Math.random()}`
 return(
  <div className = {classes.Select}>
   <label htmlFor = {htmlFor}>{props.label}</label>
   <select 
    id={htmlFor}
    value ={props.value}
    onChange = {props.onChange}
  >
  {getOptions(props.options)}
 </select>
  </div>
   )
}
export default Select