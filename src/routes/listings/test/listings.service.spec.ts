import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../services/prisma.service';
import { UpdateListingDto } from '../dto/update-listing.dto';
import { ListingsService } from '../listings.service';
import { listingStub } from './stubs/listing.stub';

jest.mock('../../../services/prisma.service');

describe('ListingsService', () => {
  let listingsService: ListingsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ListingsService, PrismaService],
    }).compile();

    listingsService = moduleRef.get<ListingsService>(ListingsService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('Create', () => {
    it('Should throw error when user doesnt exist', async () => {
      let throwError = false;
      let errorName = '';
      try {
        await listingsService.create({
          amount: 1,
          productId: 1,
          sellerId: 99,
          unitPrice: 1,
        });
      } catch (error) {
        throwError = true;
        errorName = error.response.error;
      }
      expect(throwError).toBe(true);
      expect(errorName).toBe(`No user found for id 99`);
    });
    it('Should throw error when listing amount is higher than owned amount', async () => {
      let throwError = false;
      let errorName = '';
      try {
        await listingsService.create({
          amount: 10,
          productId: 1,
          sellerId: 1,
          unitPrice: 1,
        });
      } catch (error) {
        throwError = true;
        errorName = error.response.error;
      }
      expect(throwError).toBe(true);
      expect(errorName).toBe(
        'User doesnt have enough of this product, selling: 10, have: 1',
      );
    });
    it('Should throw error when user doesnt have the product', async () => {
      let throwError = false;
      let errorName = '';
      try {
        await listingsService.create({
          amount: 1,
          productId: 2,
          sellerId: 1,
          unitPrice: 1,
        });
      } catch (error) {
        throwError = true;
        errorName = error.response.error;
      }
      expect(throwError).toBe(true);
      expect(errorName).toBe(`User doesn't have product id 2`);
    });
    it('Should call create a listing and return it', async () => {
      const listing = await listingsService.create({
        amount: 1,
        productId: 1,
        sellerId: 1,
        unitPrice: 1,
      });
      expect(prismaService.listing.create).toHaveBeenCalled();
      expect(listing.productId).toBe(listingStub().productId);
    });
  });
  describe('FindAll', () => {
    it('Should call FindAll function and return an array', async () => {
      const listings = await listingsService.findAll();
      expect(prismaService.listing.findMany).toHaveBeenCalled();
      expect(listings[0].sellerId).toBe(listingStub().sellerId);
    });
  });
  describe('FindAllPage', () => {
    it('Should call FindAllPage with page number and return an array', async () => {
      const listings = await listingsService.findAllPage(1);
      expect(prismaService.listing.findMany).toHaveBeenCalled();
      expect(listings[0].sellerId).toBe(listingStub().sellerId);
    });
    it('Should call FindAllPage with no page number and return an array', async () => {
      const listings = await listingsService.findAllPage();
      expect(prismaService.listing.findMany).toHaveBeenCalled();
      expect(listings[0].sellerId).toBe(listingStub().sellerId);
    });
  });
  describe('FindOne', () => {
    it('Should call findUnique function and return null if doesnt exist', async () => {
      const { id } = listingStub();
      const listing = await listingsService.findOne(id);
      expect(prismaService.listing.findUnique).toHaveBeenCalled();
      expect(listing).toBe(null);
    });
    it('Should call findUnique function and return a listing', async () => {
      const { id } = listingStub();
      const listing = await listingsService.findOne(id);
      expect(prismaService.listing.findUnique).toHaveBeenCalled();
      expect(listing.id).toBe(listingStub().id);
    });
  });
  describe('Update', () => {
    it('Should call Update function and return the updated value', async () => {
      const { id } = listingStub();
      const update: UpdateListingDto = {
        amount: 1,
        productId: 1,
        sellerId: 1,
        unitPrice: 1,
      };
      const listing = await listingsService.update(id, update);
      expect(prismaService.listing.update).toHaveBeenCalled();
      expect(listing.id).toBe(listingStub().id);
    });
  });
  describe('Delete', () => {
    it('Should call Delete function and return the deleted value', async () => {
      const { id } = listingStub();
      const listing = await listingsService.remove(id);
      expect(prismaService.listing.delete).toHaveBeenCalled();
      expect(listing.id).toBe(listingStub().id);
    });
  });
});
