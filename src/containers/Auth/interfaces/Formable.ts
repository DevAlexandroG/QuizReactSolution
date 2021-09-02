import {Authorizable} from './Authorizable';

export interface Formable
{
  email: Authorizable
  password: Authorizable,
  // line:Record<string,[inputAuthorizable:Authorizable]> TODO replace Object.key
}