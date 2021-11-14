import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../services/prisma.service';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';

jest.mock('../../../services/prisma.service');

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('Create', () => {
    it('Should call create function with name params and return a value', async () => {
      const user = await usersService.create({ name: 'none' });
      expect(prismaService.user.findFirst).toHaveBeenCalled();
      expect(prismaService.user.create).not.toHaveBeenCalled();
      expect(user.name).toBe(userStub().name);
    });
    it('Should call create function with name params and create new user if doesnt exist', async () => {
      const user = await usersService.create({ name: 'none' });
      expect(prismaService.user.findFirst).toHaveBeenCalled();
      expect(prismaService.user.create).toHaveBeenCalled();
      expect(user.name).toBe(userStub().name);
    });
  });
});
