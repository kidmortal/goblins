import { Product, User } from '.prisma/client';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../services/prisma.service';
import { ProductsController } from '../products.controller';
import { ProductsModule } from '../products.module';
import { ProductsService } from '../products.service';
import { productStub } from './stubs/product.stub';

jest.mock('../users.service.ts');

describe('UsersController', () => {
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
    let users: User[];
    beforeEach(async () => {
      users = await usersController.findAll();
    });

    it('Should call findAll function', () => {
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });
  describe('Find One', () => {
    let user: User;
    beforeEach(async () => {
      user = await usersController.findOne(String(userStub().id));
    });

    it('Should call findOne function and return a user', () => {
      expect(usersService.findOne).toHaveBeenCalledWith(userStub().id);
      expect(user.id).toBe(userStub().id);
    });
  });
  describe('Update One', () => {
    let user: User;
    beforeEach(async () => {
      user = await usersController.update(String(userStub().id), {});
    });

    it('Should call Update function and return the updated user', () => {
      expect(usersService.update).toHaveBeenCalledWith(userStub().id, {});
      expect(user.id).toBe(userStub().id);
    });
  });
  describe('Remove One', () => {
    let user: User;
    beforeEach(async () => {
      user = await usersController.remove(String(userStub().id));
    });

    it('Should call Remove function and return the removed user', () => {
      expect(usersService.remove).toHaveBeenCalledWith(userStub().id);
      expect(user.id).toBe(userStub().id);
    });
  });
});
