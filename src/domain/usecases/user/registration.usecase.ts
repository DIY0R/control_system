import { AuthError } from '../../description_objects/error/auth.error';
import { HashGenerator } from '../../description_objects/hashGenerator/hashGenerator';
import {
  UserLoginDto,
  UserRegistrationDto,
} from '../../description_objects/user/user.dto';
import { User } from '../../entities/user/user';
import { UserRepository } from '../../repositories/user.auth';
import {
  checkEmailStrength,
  checkPasswordStrength,
} from '../../utils/authUtils';

export class AuthUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator,
    private readonly errorObject: AuthError
  ) {}

  async registration(
    userRegistrationDto: UserRegistrationDto
  ): Promise<User | Error> {
    const { email, name, nick, password, role } = userRegistrationDto;

    if (!checkEmailStrength(email) || !checkPasswordStrength(password))
      throw new Error(this.errorObject.registrationError);

    const userByNick = await this.userRepository.findOneByNick(nick);
    const userByEmail = await this.userRepository.findOneByEmail(email);

    if (!!userByNick || !!userByEmail)
      throw new Error(this.errorObject.registrationError);

    const hashPassword = await this.hashGenerator.hash(password, 5);
    const newUser = await this.userRepository.create({
      email,
      name,
      nick,
      password: hashPassword,
      role,
      description: [],
      photo: '',
    });
    return newUser;
  }
}
