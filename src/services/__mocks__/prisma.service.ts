import { userStub } from '../../routes/users/test/stubs/user.stub';

export const PrismaService = jest.fn().mockReturnValue({
  user: {
    findFirst: jest.fn().mockReturnValueOnce(userStub()).mockReturnValue(null),
    findMany: jest.fn().mockReturnValue([userStub()]),
    create: jest.fn().mockResolvedValue(userStub()),
    update: jest.fn().mockResolvedValue(userStub()),
    delete: jest.fn().mockResolvedValue(userStub()),
  },
});
