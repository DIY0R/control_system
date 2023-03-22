import { rolesTypes } from './roles';

export class User {
  id: number;
  name: string;
  nick: string;
  email: string;
  photo: string;
  password: string;
  description: Array<string>;
  role: Array<rolesTypes>;
}
