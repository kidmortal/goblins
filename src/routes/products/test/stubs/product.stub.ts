import { Product } from '.prisma/client';

export const productStub = (): Product => {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 1,
    iconUrl: '',
    name: 'John Doe',
  };
};
