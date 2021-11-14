import { User } from '.prisma/client';

export const userStub = (): User => {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    iconUrl: '',
    id: 1,
    name: 'John Doe',
    money: 0,
  };
};
