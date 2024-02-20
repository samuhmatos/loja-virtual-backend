import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository, UserService } from '../user.service';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userMock } from '../__mocks__/user.mock';
import { createUserMock } from '../__mocks__/createUser.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userMock),
            save: jest.fn().mockResolvedValue(userMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findByEmail', async () => {
    const user = await service.findByEmail(userMock.email);

    expect(user).toEqual(userMock);
  });

  it('should return error in findByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findByEmail(userMock.email)).rejects.toThrowError();
  });

  it('should return error in findByEmail {error DB}', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(service.findByEmail(userMock.email)).rejects.toThrowError();
  });

  it('should return user in findById', async () => {
    const user = await service.findById(userMock.id);

    expect(user).toEqual(userMock);
  });

  it('should return error in findById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findById(userMock.id)).rejects.toThrowError();
  });

  it('should return error in findById {error DB}', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(service.findById(userMock.id)).rejects.toThrowError();
  });

  it('should return user in getUserByIdUsingRelations', async () => {
    const user = await service.getUserByIdUsingRelations(userMock.id);

    expect(user).toEqual(userMock);
  });

  it('should return error if user exist in create', async () => {
    expect(service.create(createUserMock)).rejects.toThrowError();
  });

  it('should return user if user not exist in create', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const user = await service.create(createUserMock);

    expect(user).toEqual(userMock);
  });
});
