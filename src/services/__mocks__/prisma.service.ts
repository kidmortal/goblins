import { transactionStub } from '../../routes/transactions/test/stubs/transaction.stub';
import { listingStub } from '../../routes/listings/test/stubs/listing.stub';
import { productStub } from '../../routes/products/test/stubs/product.stub';
import { usersStub, userStub } from '../../routes/users/test/stubs/user.stub';

export const PrismaService = jest.fn().mockReturnValue({
  user: {
    findUnique: jest.fn((param) => {
      const id = param.where.id;
      const name = param?.where?.name;
      if (id) return usersStub.find((user) => user.id === id);
      if (name) return usersStub.find((user) => user.name === name);
      return null;
    }),
    findMany: jest.fn().mockReturnValue([userStub()]),
    create: jest.fn().mockResolvedValue(userStub()),
    update: jest.fn().mockResolvedValue(userStub()),
    delete: jest.fn().mockResolvedValue(userStub()),
  },
  product: {
    findFirst: jest.fn().mockReturnValue(productStub()),
    findUnique: jest.fn().mockReturnValue(productStub()),
    findMany: jest.fn().mockReturnValue([productStub()]),
    create: jest.fn().mockResolvedValue(productStub()),
    update: jest.fn().mockResolvedValue(productStub()),
    delete: jest.fn().mockResolvedValue(productStub()),
  },
  listing: {
    findFirst: jest.fn().mockReturnValue(listingStub()),
    findUnique: jest
      .fn()
      .mockResolvedValueOnce(null)
      .mockReturnValue(listingStub()),
    findMany: jest.fn().mockReturnValue([listingStub()]),
    create: jest.fn().mockResolvedValue(listingStub()),
    update: jest.fn().mockResolvedValue(listingStub()),
    delete: jest.fn().mockResolvedValue(listingStub()),
  },
  transaction: {
    findFirst: jest.fn().mockReturnValue(transactionStub()),
    findUnique: jest.fn().mockReturnValue(transactionStub()),
    findMany: jest.fn().mockReturnValue([transactionStub()]),
    create: jest.fn().mockResolvedValue(transactionStub()),
    update: jest.fn().mockResolvedValue(transactionStub()),
    delete: jest.fn().mockResolvedValue(transactionStub()),
  },
});
