import {ILogin} from '../../project/trip/interface/ILogin';
import {IAuthority} from '../../project/trip/interface/IAuthority';

export  class loginModel implements ILogin{
  authorities: IAuthority[];
  description: string;
  email: string;
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  picture: string[];
  status: number;
  uuid: string;

  constructor(authorities ?: IAuthority[], description ?: string, email ? : string, firstName ?: string, lastName ?: string, login ?: string, password ?: string,
              picture ?: string[], status ?: number, uuid ?: string) {
    this.authorities = authorities;
    this.description = description;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.login = login;
    this.password = password;
    this.picture = picture;
    this.status = status;
    this.uuid = uuid;
  }
}
