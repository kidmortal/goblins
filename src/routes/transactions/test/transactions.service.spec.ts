import { Test } from '@nestjs/testing';
import { createUser, usersStub } from '../../users/test/stubs/user.stub';
import { PrismaService } from '../../../services/prisma.service';
import { TransactionService } from '../transactions.service';
import { transactionStub } from './stubs/transaction.stub';

jest.mock('../../../services/prisma.service');

describe('transactionsService', () => {
  let transactionsService: TransactionService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TransactionService, PrismaService],
    }).compile();

    transactionsService = moduleRef.get<TransactionService>(TransactionService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });
  describe('Create', () => {
    it('Should throw error when user is not authenticated', async () => {
      const user = createUser({ id: 50 });
      let throwError = false;
      let errorName = '';

      try {
        await transactionsService.create(
          {
            listingId: 99,
            amount: 1,
            receiverId: 1,
          },
          user,
        );
      } catch (error) {
        throwError = true;
        errorName = error.response.error;
      }
      expect(throwError).toBe(true);
      expect(errorName).toBe(`Unauthorized`);
    });
    it('Should throw error when listing doesnt exist', async () => {
      const user = usersStub[0];
      let throwError = false;
      let errorName = '';

      try {
        await transactionsService.create(
          {
            listingId: 99,
            amount: 1,
            receiverId: 1,
          },
          user,
        );
      } catch (error) {
        throwError = true;
        errorName = error.response.error;
      }
      expect(throwError).toBe(true);
      expect(errorName).toBe(`No listing found for id 99`);
    });
    it('Should throw error when receiving user doesnt exist', async () => {
      const user = { ...usersStub[0] };
      user.id = 99;
      let throwError = false;
      let errorName = '';
      try {
        await transactionsService.create(
          {
            listingId: 1,
            amount: 1,
            receiverId: 99,
          },
          user,
        );
      } catch (error) {
        throwError = true;
        errorName = error.response.error;
      }
      expect(throwError).toBe(true);
      expect(errorName).toBe(`No receiver user with id 99`);
    });
    it('Should throw error when transaction amount is higher than listed', async () => {
      const user = createUser({ id: 4 });
      let throwError = false;
      let errorName = '';
      try {
        await transactionsService.create(
          {
            listingId: 1,
            amount: 100,
            receiverId: 4,
          },
          user,
        );
      } catch (error) {
        throwError = true;
        errorName = error.response.error;
      }
      expect(throwError).toBe(true);
      expect(errorName).toBe(
        `Listing doesnt have enough amount, buying: 100, have: 10`,
      );
    });
    it('Should throw error when transaction value is higher than buyer has', async () => {
      const user = createUser({ id: 4 });
      let throwError = false;
      let errorName = '';
      try {
        await transactionsService.create(
          {
            listingId: 1,
            amount: 1,
            receiverId: 4,
          },
          user,
        );
      } catch (error) {
        throwError = true;
        errorName = error.response.error;
      }
      expect(throwError).toBe(true);
      expect(errorName).toBe(
        `User doesn't have enough money, needed: 1, has: 0`,
      );
    });
    it('Should throw error when user is buying from himself', async () => {
      const user = createUser({ id: 1 });
      let throwError = false;
      let errorName = '';
      try {
        await transactionsService.create(
          {
            listingId: 1,
            amount: 1,
            receiverId: 1,
          },
          user,
        );
      } catch (error) {
        throwError = true;
        errorName = error.response.error;
      }
      expect(throwError).toBe(true);
      expect(errorName).toBe(`User cant buy his own listing`);
    });
    it('Should create transaction when all data is okay', async () => {
      const user = createUser({ id: 5 });
      const transaction = await transactionsService.create(
        {
          listingId: 1,
          amount: 1,
          receiverId: 5,
        },
        user,
      );
      expect(transaction.id).toBe(transactionStub().id);
    });
  });
  describe('FindAll', () => {
    it('Should call FindAll function and return an array', async () => {
      const transactions = await transactionsService.findAll();
      expect(prismaService.transaction.findMany).toHaveBeenCalled();
      expect(transactions[0].id).toBe(transactionStub().id);
    });
  });
  describe('FindOne', () => {
    it('Should call findUnique function and return a listing', async () => {
      const { id } = transactionStub();
      const listing = await transactionsService.findOne(id);
      expect(prismaService.transaction.findUnique).toHaveBeenCalled();
      expect(listing.id).toBe(transactionStub().id);
    });
  });

  describe('Delete', () => {
    it('Should call Delete function and return the deleted value', async () => {
      const { id } = transactionStub();
      const listing = await transactionsService.remove(id);
      expect(prismaService.transaction.delete).toHaveBeenCalled();
      expect(listing.id).toBe(transactionStub().id);
    });
  });
});
