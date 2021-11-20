import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../services/prisma.service';
import { UpdateListingDto } from '../dto/update-listing.dto';
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
    it('Should call create function with name params and return a value', async () => {
      const listing = await listingsController.create(
        { user: { id: 1 } },
        {
          amount: 1,
          unitPrice: 1,
          sellerId: 1,
          productId: 1,
        },
      );
      expect(listingsService.create).toBeCalledWith(
        {
          amount: 1,
          unitPrice: 1,
          sellerId: 1,
          productId: 1,
        },
        { id: 1 },
      );
      expect(listing.productId).toBe(listingStub().productId);
    });
  });
  describe('Find all', () => {
    it('Should call findAll function and return an array', async () => {
      const listings = await listingsController.findAll();
      expect(listingsService.findAll).toHaveBeenCalled();
      expect(listings).toBeInstanceOf(Array);
      expect(listings[0].id).toBe(listingStub().id);
    });
  });
  describe('Find all Page', () => {
    it('Should call findAllPage function with page number and return an array', async () => {
      const listings = await listingsController.findAllPage(String(1));
      expect(listingsService.findAllPage).toHaveBeenCalledWith(1);
      expect(listings).toBeInstanceOf(Array);
      expect(listings[0].id).toBe(listingStub().id);
    });
  });
  describe('Find One', () => {
    it('Should call findOne function and return a listing', async () => {
      const { id } = listingStub();
      const listing = await listingsController.findOne(String(id));
      expect(listingsService.findOne).toHaveBeenCalled();
      expect(listing.id).toBe(listingStub().id);
    });
  });
  describe('Update one', () => {
    it('Should call update function and return a listing', async () => {
      const { id } = listingStub();
      const update: UpdateListingDto = {
        amount: 1,
        productId: 1,
        sellerId: 1,
        unitPrice: 1,
      };
      const listing = await listingsController.update(String(id), update);
      expect(listingsService.update).toHaveBeenCalledWith(id, update);
      expect(listing.id).toBe(listingStub().id);
    });
  });
  describe('Delete one', () => {
    it('Should call delete function and return a listing', async () => {
      const { id } = listingStub();
      const listing = await listingsController.remove(String(id));
      expect(listingsService.remove).toHaveBeenCalled();
      expect(listing.id).toBe(listingStub().id);
    });
  });
});
