import { UserInfo } from 'os';
import { AuthError } from '../../../domain/description_objects/error/auth.error';
import { UserLoginDto } from '../../../domain/description_objects/user/user.dto';
import { User } from '../../../domain/entities/user/user';
import { UserRepo } from '../../../domain/repositories/user.auth';
import { AuthUseCase } from '../../../domain/usecases/user/auth.usecase';

describe('AuthTests login', () => {
  //   const errorGenerate: UserRepo = {
  //     create,
  //   };
  const AuthErrorImpl: AuthError = {
    loginError: { error: 'forbidden', code: 403 },
  };
  const baseHesh = {
    base: jest.fn((a: number, b: number) => (a == b ? true : false)),
  };
  const authUseCase = new AuthUseCase(
    {} as any,
    baseHesh as any,
    AuthErrorImpl
  );

  afterEach(() => {
    baseHesh.base.mockClear();
    checkNick.mockClear();
  });
  const getOneUser: User = {
    id: 1,
    description: ['hr', 'admin'],
    email: 'hello@gmail.com',
    name: 'Victorya',
    nick: 'vista',
    password: '123',
    photo: 'https://presto/hi.jpg',
    role: ['HR', 'MIDDLE'],
  };
  const checkNick = jest
    .spyOn(authUseCase as any, 'checkNick')
    .mockImplementation(
      async (nick): Promise<User | null> =>
        nick == getOneUser.nick ? getOneUser : null
    );

  test('sucess', async () => {
    const loginData: UserLoginDto = {
      nick: 'vista',
      password: '123',
    };
    expect(await authUseCase.login(loginData)).toEqual(getOneUser);

    expect(checkNick).toBeCalledTimes(1);
    expect(baseHesh.base).toHaveBeenCalledTimes(1);
  });

  test('fall incorrect nick', async () => {
    const loginData: UserLoginDto = {
      nick: 'vista_error',
      password: '123',
    };

    expect(await authUseCase.login(loginData)).toEqual(
      AuthErrorImpl.loginError
    );
    console.log(checkNick.mock.results);
    expect(await checkNick.mock.results[0].value).toEqual(null);
  });

  test('fall incorrect password', async () => {
    const loginData: UserLoginDto = {
      nick: 'vista',
      password: '123_2',
    };

    expect(await authUseCase.login(loginData)).toEqual(
      AuthErrorImpl.loginError
    );
    expect(await checkNick.mock.results[0].value).toEqual(getOneUser);
    expect(await baseHesh.base.mock.results[0].value).toEqual(false);
  });
});
