import {Questionable} from './Questionable'
import { RouteComponentProps } from 'react-router-dom';

export interface Quizible extends RouteComponentProps
{
  quiz:Array<Questionable>;
}


