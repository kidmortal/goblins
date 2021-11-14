import { userStub } from '../../routes/users/test/stubs/user.stub';

export const PrismaService = jest.fn().mockReturnValue({
  user: {
    findFirst: jest.fn().mockReturnValueOnce(userStub()).mockReturnValue(null),
    create: jest.fn().mockResolvedValue(userStub()),
  },
});
