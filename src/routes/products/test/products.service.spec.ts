import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../services/prisma.service';
import { ProductsController } from '../products.controller';
import { ProductsModule } from '../products.module';
import { ProductsService } from '../products.service';
import { productStub } from './stubs/product.stub';

jest.mock('../../../services/prisma.service');

describe('UsersService', () => {
  let productsService: ProductsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProductsModule],
      controllers: [ProductsController],
      providers: [ProductsService, PrismaService],
    }).compile();

    productsService = moduleRef.get<ProductsService>(ProductsService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('Create', () => {
    it('Should call create function with name params and return a value', async () => {
      const product = await productsService.create({ name: 'none' });
      expect(prismaService.product.create).toHaveBeenCalled();
      expect(product.name).toBe(productStub().name);
    });
  });
  describe('FindAll', () => {
    it('Should call FindAll function and return an array', async () => {
      const products = await productsService.findAll();
      expect(prismaService.product.findMany).toHaveBeenCalled();
      expect(products[0].id).toBe(productStub().id);
    });
  });
  describe('FindOne', () => {
    it('Should call FindOne function and return an value', async () => {
      const product = await productsService.findOne(productStub().id);
      expect(prismaService.product.findUnique).toHaveBeenCalled();
      expect(product.id).toBe(productStub().id);
    });
  });
  describe('Update', () => {
    it('Should call Update function and return a user', async () => {
      const product = await productsService.update(productStub().id, {
        name: productStub().name,
      });
      expect(prismaService.product.update).toHaveBeenCalled();
      expect(product.id).toBe(productStub().id);
    });
  });
  describe('Delete', () => {
    it('Should call Delete function and return a user', async () => {
      const product = await productsService.remove(productStub().id);
      expect(prismaService.product.delete).toHaveBeenCalled();
      expect(product.id).toBe(productStub().id);
    });
  });
});
