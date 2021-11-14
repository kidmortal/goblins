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
    it('Should call create function with name params and return a value', async () => {
      const transaction = await transactionsController.create({
        amount: 1,
        listingId: 1,
        receiverId: 1,
      });
      expect(transactionsService.create).toBeCalledWith({
        amount: 1,
        listingId: 1,
        receiverId: 1,
      });
      expect(transaction.listingId).toBe(transactionStub().productId);
    });
  });
  describe('Find all', () => {
    it('Should call findAll function and return an array', async () => {
      const transactions = await transactionsController.findAll();
      expect(transactionsService.findAll).toHaveBeenCalled();
      expect(transactions).toBeInstanceOf(Array);
      expect(transactions[0].listingId).toBe(transactionStub().listingId);
    });
  });

  describe('Find One', () => {
    it('Should call findOne function and return a listing', async () => {
      const { id } = transactionStub();
      const listing = await transactionsController.findOne(String(id));
      expect(transactionsService.findOne).toHaveBeenCalled();
      expect(listing.id).toBe(transactionStub().id);
    });
  });

  describe('Delete one', () => {
    it('Should call delete function and return a listing', async () => {
      const { id } = transactionStub();
      const listing = await transactionsController.remove(String(id));
      expect(transactionsService.remove).toHaveBeenCalled();
      expect(listing.id).toBe(transactionStub().id);
    });
  });
});
