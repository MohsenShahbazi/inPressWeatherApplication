import {IAuthority} from './IAuthority';

export interface ILogin {
  authorities: IAuthority[];
  description: string;
  email: string;
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  picture: string[];
  status: number;
  uuid :string;
}
