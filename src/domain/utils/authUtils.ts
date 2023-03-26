import { User } from '../entities/user/user';
import { UserRepo } from '../repositories/user.auth';

async function checkNick(
  userRepo: UserRepo,
  nick: string
): Promise<User | null> {
  const user = await userRepo.findOneByNick(nick);
  console.log(user);
  if (!user) return null;
  return user;
}

export { checkNick };
