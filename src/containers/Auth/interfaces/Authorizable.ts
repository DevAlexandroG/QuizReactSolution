import {Validate} from './Validate';

export interface Authorizable
{
  value: string,
  type: string,
  label: string,
  errorMessage: string,
  valid: boolean,
  touched: boolean,
  validation:Validate
}
