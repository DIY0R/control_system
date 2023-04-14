import { User } from '../entities/user/user';

export abstract class UserRepository {
  abstract getAll(page: number, lim: number): Promise<User[]>;
  abstract findOneByNick(nick: string): Promise<User>;
  abstract findOneByEmail(email: string): Promise<User>;
  abstract create(item: User): Promise<User>;
}
