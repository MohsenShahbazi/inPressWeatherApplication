import {IAuthority} from '../interface/IAuthority';


export  class authorityModel implements IAuthority{
  authority: string;

  constructor(authority ?: string) {
    this.authority = authority;
  }
}
