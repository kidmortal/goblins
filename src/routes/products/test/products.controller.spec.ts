import { Product, User } from '.prisma/client';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../services/prisma.service';
import { ProductsController } from '../products.controller';
import { ProductsModule } from '../products.module';
import { ProductsService } from '../products.service';
import { productStub } from './stubs/product.stub';

jest.mock('../products.service.ts');

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProductsModule],
      controllers: [ProductsController],
      providers: [ProductsService, PrismaService],
    }).compile();

    productsController = moduleRef.get<ProductsController>(ProductsController);
    productsService = moduleRef.get<ProductsService>(ProductsService);
    jest.clearAllMocks();
  });

  describe('Create', () => {
    let product: Product;
    beforeEach(async () => {
      product = await productsController.create({ name: productStub().name });
    });

    it('Should call create function with name params and return a value', () => {
      expect(productsService.create).toBeCalledWith({
        name: productStub().name,
      });
      expect(product.name).toBe(productStub().name);
    });
  });
  describe('Find all', () => {
    let products: Product[];
    beforeEach(async () => {
      products = await productsController.findAll();
    });

    it('Should call findAll function and return an array', () => {
      expect(productsService.findAll).toHaveBeenCalled();
      expect(products).toBeInstanceOf(Array);
      expect(products[0].name).toBe(productStub().name);
    });
  });
  describe('Find One', () => {
    let product: Product;
    beforeEach(async () => {
      product = await productsController.findOne(String(productStub().id));
    });

    it('Should call findOne function and return a product', () => {
      expect(productsService.findOne).toHaveBeenCalledWith(productStub().id);
      expect(product.id).toBe(productStub().id);
    });
  });
  describe('Update One', () => {
    let product: Product;
    beforeEach(async () => {
      product = await productsController.update(String(productStub().id), {
        name: productStub().name,
      });
    });

    it('Should call Update function and return the updated product', () => {
      expect(productsService.update).toHaveBeenCalledWith(productStub().id, {
        name: productStub().name,
      });
      expect(product.id).toBe(productStub().id);
    });
  });
  describe('Remove One', () => {
    let product: Product;
    beforeEach(async () => {
      product = await productsController.remove(String(productStub().id));
    });

    it('Should call Remove function and return the removed product', () => {
      expect(productsService.remove).toHaveBeenCalledWith(productStub().id);
      expect(product.id).toBe(productStub().id);
    });
  });
});
