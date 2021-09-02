import {Authorizable} from './../../../../containers/Auth/interfaces/Authorizable';
export interface Imputly
{
  inputData:Authorizable,
  shouldValidate:boolean;
  onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
}
