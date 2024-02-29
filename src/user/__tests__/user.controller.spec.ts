import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { userMock } from '../__mocks__/user.mock';
import { createUserMock } from '../__mocks__/createUser.mock';
import { returnUserMock } from '../__mocks__/returnUser.mock';
import { updatePasswordMock } from '../__mocks__/updateUser.mock';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(userMock),
            getAll: jest.fn().mockResolvedValue([userMock]),
            getUserByIdUsingRelations: jest.fn().mockResolvedValue(userMock),
            updatePassword: jest.fn().mockResolvedValue(userMock),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return User in create', async () => {
    const user = await controller.create(createUserMock);

    expect(user).toEqual(userMock);
  });

  it('should return User[] in getAll', async () => {
    const users = await controller.getAll();

    expect(users).toEqual([returnUserMock]);
  });

  it('should return User in getOneById', async () => {
    const user = await controller.getOneById(userMock.id);

    expect(user).toEqual(returnUserMock);
  });

  it('should return User in updatePassword', async () => {
    const user = await controller.updatePassword(
      userMock.id,
      updatePasswordMock,
    );

    expect(user).toEqual(returnUserMock);
  });
});
