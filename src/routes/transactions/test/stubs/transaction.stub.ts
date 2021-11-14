import { Transaction } from '.prisma/client';

export const transactionStub = (): Transaction => {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 1,
    amount: 1,
    productId: 1,
    receiverId: 1,
    listingId: 1,
    senderId: 1,
  };
};
