import { AuthError } from '../../../domain/description_objects/error/auth.error';
import { UserLoginDto } from '../../../domain/description_objects/user/user.dto';
import { User } from '../../../domain/entities/user/user';
import { AuthUseCase } from '../../../domain/usecases/user/logn.usecase';

describe('AuthTests login', () => {
  const AuthErrorImpl: AuthError = {
    loginError: 'Неправильный логин или пароль',
    registrationError: 'Этот пользователь уже зарегистрирован',
  };
  const baseHesh = {
    compare: jest.fn((a: number, b: number) => (a == b ? true : false)),
  };
  let loginData: UserLoginDto;
  const getOneUser: User = {
    id: 1,
    description: ['hr', 'admin'],
    email: 'hello@gmail.com',
    name: 'Victorya',
    nick: 'vista',
    password: 'StrongPassword123',
    photo: 'https://presto/hi.jpg',
    role: ['HR', 'MIDDLE'],
  };
  let userRepoMock = {
    findOneByNick: jest.fn(async (nick) =>
      getOneUser.nick == nick ? getOneUser : null
    ),
  };

  const authUseCase = new AuthUseCase(
    userRepoMock as any,
    baseHesh,
    AuthErrorImpl
  );
  beforeEach(() => {
    loginData = {} as UserLoginDto;
  });
  afterEach(() => {
    userRepoMock.findOneByNick.mockClear();
    baseHesh.compare.mockClear();
  });

  test('sucess', async () => {
    loginData = {
      nick: 'vista',
      password: 'StrongPassword123',
    };
    expect(await authUseCase.login(loginData)).toEqual(getOneUser);
    // expect(baseHesh.base).toHaveBeenCalledTimes(1);
    expect(await baseHesh.compare.mock.results[0].value).toEqual(true);
  });

  test('fall incorrect nick', async () => {
    loginData = {
      nick: 'vista_error',
      password: '123',
    };

    expect(
      async () => await authUseCase.login(loginData)
    ).rejects.toThrowError();
    expect(await userRepoMock.findOneByNick.mock.results[0].value).toBeNull();
    expect(baseHesh.compare).toHaveBeenCalledTimes(0);
  });

  test('fall incorrect password', async () => {
    loginData = {
      nick: 'vista',
      password: 'w2222s',
    };

    expect(
      async () => await authUseCase.login(loginData)
    ).rejects.toThrowError();
    expect(await userRepoMock.findOneByNick).toHaveBeenCalledTimes(1);
  });
});
