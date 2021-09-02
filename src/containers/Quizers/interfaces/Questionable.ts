export interface Questionable  
{
  id:number;
  name:string;
  rightAnswerId:number;

   answer:
   {
      id:number,
      text:string
   }[];
}