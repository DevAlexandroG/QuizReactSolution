import {Authorizable} from '../containers/Auth/interfaces/Authorizable';
import { Validate } from '../containers/Auth/interfaces/Validate';
export interface controlOption extends Authorizable{
    id:number,
  result:{requried:boolean}

}
export function createControl(config:any,validation:Validate):controlOption
{
  return{
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value:'',
    
  }
}

export function validate(value:string,validation:any)
{
  if(!validate)
    return true;
  
  let isValid = true;
  if(validation.required)
  {
    isValid = value.trim() !== '' && isValid;
  }

  return isValid;
}

export function validateForm(formControls:Map<string, controlOption>)
{
  let isFormValid = true;
  for (let control in formControls)
  {
    if(formControls.hasOwnProperty(control))
    {
      console.log(control);
    }
  }
  return isFormValid;
}