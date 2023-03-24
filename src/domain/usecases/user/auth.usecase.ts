import { AuthError } from '../../description_objects/error/auth.error';
import { UserLoginDto } from '../../description_objects/user/user.dto';
import { User } from '../../entities/user/user';
import { UserRepo } from '../../repositories/user.auth';

export class AuthUseCase {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly hesh: any,
    private readonly errorGenerate: AuthError
  ) {}
  private async checkNick(nick: string): Promise<User | null> {
    const user = await this.userRepo.findOneByNick(nick);
    if (!user) return null;
    return user;
  }

  async login(loginDto: UserLoginDto) {
    const { nick, password } = loginDto;
    const user = await this.checkNick(nick);
    if (user == null) return this.errorGenerate.loginError;
    const checkPassword = this.hesh.base(user.password, password);
    if (checkPassword) return user;
    return this.errorGenerate.loginError;
  }

  async registration() {}
}
