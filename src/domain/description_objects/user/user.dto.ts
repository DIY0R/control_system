import { User } from '../../entities/user/user';

export interface UserLoginDto {
  nick: string;
  password: string;
}
export type UserRegistrationDto = Pick<
  User,
  'name' | 'nick' | 'email' | 'password' | 'role'
>;
