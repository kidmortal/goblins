import { User, UserHasProduct } from '.prisma/client';

export const usersStub = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    iconUrl: '',
    id: 1,
    name: 'John Doe',
    password: '123',
    money: 1,
    UserHasProduct: [{ amount: 1, productId: 1, userId: 1 }],
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    iconUrl: '',
    id: 2,
    name: 'John Doe',
    password: '123',
    money: 0,
    UserHasProduct: [],
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    iconUrl: '',
    id: 3,
    name: 'John Snow',
    password: '333',
    money: 1,
    UserHasProduct: [],
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    iconUrl: '',
    id: 4,
    name: 'John Snow',
    password: '333',
    money: 0,
    UserHasProduct: [],
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    iconUrl: '',
    id: 5,
    name: 'Rico',
    password: '333',
    money: 5000,
    UserHasProduct: [],
  },
];

export function createUser({
  id = 1,
  money = 0,
  name = 'John',
}: {
  id?: number;
  money?: number;
  name?: string;
}) {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    iconUrl: '',
    id: id,
    name: name,
    money: money,
    UserHasProduct: [{ amount: 1, productId: 1, userId: 1 }],
    password: '123',
  };
}

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
    password: '123',
  };
};
