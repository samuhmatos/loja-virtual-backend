import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { userMock } from '../../user/__mocks__/user.mock';
import { JwtService } from '@nestjs/jwt';
import { JwtMock } from '../__mocks__/jwt.mock';
import { loginMock } from '../__mocks__/login.mock';
import { ReturnUserDto } from '../../user/dtos/returnUser.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue(userMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => JwtMock,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return login dto in login', async () => {
    const auth = await service.login(loginMock);

    expect(auth).toEqual({
      accessToken: JwtMock,
      user: new ReturnUserDto(userMock),
    });
  });

  it('should return error if exception by not found user in login', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(undefined);

    expect(service.login(loginMock)).rejects.toThrowError();
  });

  it('should return error in UserService in login', async () => {
    jest.spyOn(userService, 'findByEmail').mockRejectedValue(new Error());

    expect(service.login(loginMock)).rejects.toThrowError();
  });
});
