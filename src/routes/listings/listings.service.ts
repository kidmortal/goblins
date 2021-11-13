import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createListingDto: CreateListingDto) {
    const { sellerId, amount, productId } = createListingDto;
    const seller = await this.prisma.user.findUnique({
      where: { id: sellerId },
      include: { UserHasProduct: true },
    });
    if (!seller) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `No user found for id ${sellerId}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const sellingProduct = seller.UserHasProduct.find(
      (product) => product.productId === productId,
    );
    if (!sellingProduct) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `User doesn't have product id ${productId}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (sellingProduct.amount < amount) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `User doesnt have enough of this product, selling: ${amount}, have: ${sellingProduct.amount}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.user.update({
      where: { id: sellerId },
      data: {
        UserHasProduct: {
          update: {
            where: {
              userId_productId: { userId: sellerId, productId: productId },
            },
            data: {
              amount: { decrement: amount },
            },
          },
        },
      },
    });
    return this.prisma.listing.create({ data: createListingDto });
  }

  findAll() {
    return this.prisma.listing.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} listing`;
  }

  update(id: number, updateListingDto: UpdateListingDto) {
    return `This action updates a #${id} listing`;
  }

  remove(id: number) {
    return `This action removes a #${id} listing`;
  }
}
