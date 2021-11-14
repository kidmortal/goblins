import { listingStub } from '../test/stubs/listing.stub';

export const ListingService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(listingStub()),
  findAll: jest.fn().mockResolvedValue([listingStub()]),
  findOne: jest.fn().mockResolvedValue(listingStub()),
  update: jest.fn().mockResolvedValue(listingStub()),
  remove: jest.fn().mockResolvedValue(listingStub()),
});
