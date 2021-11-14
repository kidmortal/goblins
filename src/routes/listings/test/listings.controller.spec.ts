import { Listing } from '.prisma/client';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../services/prisma.service';
import { ListingsController } from '../listings.controller';
import { ListingsModule } from '../listings.module';
import { ListingsService } from '../listings.service';
import { listingStub } from './stubs/listing.stub';

jest.mock('../listings.service.ts');

describe('ListingsController', () => {
  let listingsController: ListingsController;
  let listingsService: ListingsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ListingsModule],
      controllers: [ListingsController],
      providers: [ListingsService, PrismaService],
    }).compile();

    listingsController = moduleRef.get<ListingsController>(ListingsController);
    listingsService = moduleRef.get<ListingsService>(ListingsService);
    jest.clearAllMocks();
  });

  describe('Create', () => {
    let listing: Listing;
    beforeEach(async () => {
      listing = await listingsController.create({
        amount: 1,
        unitPrice: 1,
        sellerId: 1,
        productId: 1,
      });
    });

    it('Should call create function with name params and return a value', () => {
      expect(listingsService.create).toBeCalledWith({
        amount: 1,
        unitPrice: 1,
        sellerId: 1,
        productId: 1,
      });
      expect(listing.productId).toBe(listingStub().productId);
    });
  });
  describe('Find all', () => {
    let listings: Listing[];
    beforeEach(async () => {
      listings = await listingsController.findAll();
    });

    it('Should call findAll function and return an array', () => {
      expect(listingsService.findAll).toHaveBeenCalled();
      expect(listings).toBeInstanceOf(Array);
      expect(listings[0].id).toBe(listingStub().id);
    });
  });
});
