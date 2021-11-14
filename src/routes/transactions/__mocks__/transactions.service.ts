import { transactionStub } from '../test/stubs/transaction.stub';

export const TransactionService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(transactionStub()),
  findAll: jest.fn().mockResolvedValue([transactionStub()]),
  findOne: jest.fn().mockResolvedValue(transactionStub()),
  update: jest.fn().mockResolvedValue(transactionStub()),
  remove: jest.fn().mockResolvedValue(transactionStub()),
});
