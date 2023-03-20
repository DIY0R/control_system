import { rolesTypes } from './roles';

export class User {
  id: number;
  name: string;
  email: string;
  photo: string;
  description: Array<string>;
  role: Array<rolesTypes>;
}
