import { Listing } from '.prisma/client';

export const listingStub = (): Listing => {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 1,
    amount: 10,
    productId: 1,
    sellerId: 1,
    unitPrice: 1,
  };
};
