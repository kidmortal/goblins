import { Test } from '@nestjs/testing';
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
    it('Should throw error when listing doesnt exist', async () => {
      let throwError = false;
      let errorName = '';

      try {
        await transactionsService.create({
          listingId: 99,
          amount: 1,
          receiverId: 1,
        });
      } catch (error) {
        throwError = true;
        errorName = error.response.error;
      }
      expect(throwError).toBe(true);
      expect(errorName).toBe(`No listing found for id 99`);
    });
    it('Should throw error when receiving user doesnt exist', async () => {
      let throwError = false;
      let errorName = '';
      try {
        await transactionsService.create({
          listingId: 1,
          amount: 1,
          receiverId: 99,
        });
      } catch (error) {
        throwError = true;
        errorName = error.response.error;
      }
      expect(throwError).toBe(true);
      expect(errorName).toBe(`No receiver user with id 99`);
    });
    it('Should throw error when transaction amount is higher than listed', async () => {
      let throwError = false;
      let errorName = '';
      try {
        await transactionsService.create({
          listingId: 1,
          amount: 10,
          receiverId: 1,
        });
      } catch (error) {
        throwError = true;
        errorName = error.response.error;
      }
      expect(throwError).toBe(true);
      expect(errorName).toBe(
        `Listing doesnt have enough amount, buying: 10, have: 1`,
      );
    });
    it('Should throw error when transaction value is higher than buyer has', async () => {
      let throwError = false;
      let errorName = '';
      try {
        await transactionsService.create({
          listingId: 1,
          amount: 1,
          receiverId: 2,
        });
      } catch (error) {
        throwError = true;
        errorName = error.response.error;
      }
      expect(throwError).toBe(true);
      expect(errorName).toBe(
        `User doesn't have enough money, needed: 1, has: 0`,
      );
    });
    it('Should create transaction when all data is okay', async () => {
      const transaction = await transactionsService.create({
        listingId: 99,
        amount: 1,
        receiverId: 1,
      });
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
