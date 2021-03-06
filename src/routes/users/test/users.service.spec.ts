import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../services/prisma.service';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';

jest.mock('../../../services/prisma.service');

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('Create', () => {
    it('Should throw error if there is a user with the selected name', async () => {
      let throwError = false;
      let errorName = '';
      try {
        await usersService.create({
          name: 'John Snow',
          password: '123',
        });
      } catch (error) {
        throwError = true;
        errorName = error.response.error;
      }
      expect(throwError).toBe(true);
      expect(errorName).toBe(`Username John Snow is already being used`);
    });
    it('Should be able to create a user if there isnt anyone with the selected name', async () => {
      const user = await usersService.create({ name: 'none', password: '123' });
      expect(prismaService.user.findUnique).toHaveBeenCalled();
      expect(prismaService.user.create).toHaveBeenCalled();
      expect(user.name).toBe(userStub().name);
    });
  });
  describe('FindAll', () => {
    it('Should call FindAll function and return an array', async () => {
      const users = await usersService.findAll();
      expect(prismaService.user.findMany).toHaveBeenCalled();
      expect(users[0].id).toBe(userStub().id);
    });
  });
  describe('FindOne', () => {
    it('Should call FindOne and return null if user doesnt exist', async () => {
      const user = await usersService.findOne(0);
      expect(prismaService.user.findUnique).toHaveBeenCalled();
      expect(user).toBe(null);
    });
    it('Should call FindOne function and return an value', async () => {
      const user = await usersService.findOne(userStub().id);
      expect(prismaService.user.findUnique).toHaveBeenCalled();
      expect(user.id).toBe(userStub().id);
    });
  });
  describe('Update', () => {
    it('Should call Update function and return a user', async () => {
      const user = await usersService.update(userStub().id, {});
      expect(prismaService.user.update).toHaveBeenCalled();
      expect(user.id).toBe(userStub().id);
    });
  });
  describe('Delete', () => {
    it('Should call Delete function and return a user', async () => {
      const user = await usersService.remove(userStub().id);
      expect(prismaService.user.delete).toHaveBeenCalled();
      expect(user.id).toBe(userStub().id);
    });
  });
});
