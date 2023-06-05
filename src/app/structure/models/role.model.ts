import {IRole} from '../../project/trip/interface/IRole';

export  class roleModel implements IRole{
  authority: string;
  description: string;
  title: string;
  uuid: string;

  constructor(authority ?: string, description ?: string, title ?: string, uuid ?: string) {
    this.authority = authority;
    this.description = description;
    this.title = title;
    this.uuid = uuid;
  }
}
