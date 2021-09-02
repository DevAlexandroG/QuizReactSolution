export interface Validate
{
  required: boolean,
  isValid:(value:string)=>boolean
}