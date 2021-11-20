import { User } from '.prisma/client';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../services/prisma.service';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';

jest.mock('../users.service.ts');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('Create', () => {
    let user: User;
    beforeEach(async () => {
      user = await usersController.create({
        name: userStub().name,
        password: userStub().password,
      });
    });

    it('Should call create function with name params and return a value', () => {
      expect(usersService.create).toBeCalledWith({
        name: userStub().name,
        password: userStub().password,
      });
      expect(user.name).toBe(userStub().name);
    });
  });
  describe('Find all', () => {
    let users: User[];
    beforeEach(async () => {
      users = await usersController.findAll();
    });

    it('Should call findAll function', () => {
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });
  describe('Find One', () => {
    let user: User;
    beforeEach(async () => {
      user = await usersController.findOne(String(userStub().id));
    });

    it('Should call findOne function and return a user', () => {
      expect(usersService.findOne).toHaveBeenCalledWith(userStub().id);
      expect(user.id).toBe(userStub().id);
    });
  });
  describe('Update One', () => {
    let user: User;
    beforeEach(async () => {
      user = await usersController.update(String(userStub().id), {});
    });

    it('Should call Update function and return the updated user', () => {
      expect(usersService.update).toHaveBeenCalledWith(userStub().id, {});
      expect(user.id).toBe(userStub().id);
    });
  });
  describe('Remove One', () => {
    let user: User;
    beforeEach(async () => {
      user = await usersController.remove(String(userStub().id));
    });

    it('Should call Remove function and return the removed user', () => {
      expect(usersService.remove).toHaveBeenCalledWith(userStub().id);
      expect(user.id).toBe(userStub().id);
    });
  });
});
