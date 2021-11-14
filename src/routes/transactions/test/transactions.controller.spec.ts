import { Transaction } from '.prisma/client';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../services/prisma.service';
import { TransactionController } from '../transactions.controller';
import { TransactionModule } from '../transactions.module';
import { TransactionService } from '../transactions.service';
import { transactionStub } from './stubs/transaction.stub';

jest.mock('../transactions.service.ts');

describe('TransactionsController', () => {
  let transactionsController: TransactionController;
  let transactionsService: TransactionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TransactionModule],
      controllers: [TransactionController],
      providers: [TransactionService, PrismaService],
    }).compile();

    transactionsController = moduleRef.get<TransactionController>(
      TransactionController,
    );
    transactionsService = moduleRef.get<TransactionService>(TransactionService);
    jest.clearAllMocks();
  });

  describe('Create', () => {
    let transaction: Transaction;
    beforeEach(async () => {
      transaction = await transactionsController.create({
        amount: 1,
        listingId: 1,
        receiverId: 1,
      });
    });

    it('Should call create function with name params and return a value', () => {
      expect(transactionsService.create).toBeCalledWith({
        amount: 1,
        listingId: 1,
        receiverId: 1,
      });
      expect(transaction.listingId).toBe(transactionStub().productId);
    });
  });
  describe('Find all', () => {
    let transactions: Transaction[];
    beforeEach(async () => {
      transactions = await transactionsController.findAll();
    });

    it('Should call findAll function and return an array', () => {
      expect(transactionsService.findAll).toHaveBeenCalled();
      expect(transactions).toBeInstanceOf(Array);
      expect(transactions[0].listingId).toBe(transactionStub().listingId);
    });
  });
});
