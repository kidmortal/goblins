import { listingStub } from '../../routes/listings/test/stubs/listing.stub';
import { productStub } from '../../routes/products/test/stubs/product.stub';
import { userStub } from '../../routes/users/test/stubs/user.stub';

export const PrismaService = jest.fn().mockReturnValue({
  user: {
    findFirst: jest.fn().mockReturnValueOnce(userStub()).mockReturnValue(null),
    findUnique: jest.fn().mockReturnValue(userStub()),
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
    findUnique: jest.fn().mockReturnValue(listingStub()),
    findMany: jest.fn().mockReturnValue([listingStub()]),
    create: jest.fn().mockResolvedValue(listingStub()),
    update: jest.fn().mockResolvedValue(listingStub()),
    delete: jest.fn().mockResolvedValue(listingStub()),
  },
});
