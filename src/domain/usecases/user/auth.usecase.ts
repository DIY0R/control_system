import { AuthError } from '../../description_objects/error/auth.error';
import { UserLoginDto } from '../../description_objects/user/user.dto';
import { User } from '../../entities/user/user';
import { UserRepo } from '../../repositories/user.auth';
import { checkNick } from '../../utils/authUtils';

export class AuthUseCase {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly hesh: any,
    private readonly errorGenerate: AuthError
  ) {}

  async login(loginDto: UserLoginDto) {
    const { nick, password } = loginDto;
    const user = await checkNick(this.userRepo, nick);
    if (user == null) return this.errorGenerate.loginError;
    const checkPassword = this.hesh.base(user.password, password);
    if (checkPassword) return user;
    return this.errorGenerate.loginError;
  }

  async registration() {}
}
