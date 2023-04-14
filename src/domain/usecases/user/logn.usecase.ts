import { AuthError } from '../../description_objects/error/auth.error';
import { UserLoginDto } from '../../description_objects/user/user.dto';
import { User } from '../../entities/user/user';
import { UserRepository } from '../../repositories/user.auth';
import { checkPasswordStrength } from '../../utils/authUtils';

export class AuthUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly HashGenerator: any,
    private readonly errorObject: AuthError
  ) {}

  async login(loginDto: UserLoginDto): Promise<User | object> {
    const { nick, password } = loginDto;
    const userByNick = await this.userRepository.findOneByNick(nick);
    if (!userByNick || !checkPasswordStrength(password))
      throw new Error(this.errorObject.loginError);

    const checkPassword = this.HashGenerator.base(
      userByNick.password,
      password
    );
    console.log(checkPassword);
    if (!checkPassword) throw new Error(this.errorObject.loginError);
    return userByNick;
  }
}
