import { User, UserHasProduct } from '.prisma/client';

export const usersStub = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    iconUrl: '',
    id: 1,
    name: 'John Doe',
    money: 1,
    UserHasProduct: [{ amount: 1, productId: 1, userId: 1 }],
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    iconUrl: '',
    id: 1,
    name: 'John Doe',
    money: 0,
    UserHasProduct: [],
  },
];

export const userStub = (): User & {
  UserHasProduct: UserHasProduct[];
} => {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    iconUrl: '',
    id: 1,
    name: 'John Doe',
    money: 1,
    UserHasProduct: [{ amount: 1, productId: 1, userId: 1 }],
  };
};
