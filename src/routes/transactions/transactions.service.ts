import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(transaction: CreateTransactionDto) {
    const { listingId, receiverId, amount } = transaction;
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });
    if (!listing) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `No listing found for id id ${listingId}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (listing.amount < amount) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Listing doesnt have enough amount, buying: ${amount}, have: ${listing.amount}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const receiver = await this.prisma.user.findUnique({
      where: { id: receiverId },
      include: { UserHasProduct: true },
    });

    if (!receiver) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `No receiver user with id ${receiverId}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const totalPrice = amount * listing.unitPrice;
    if (receiver.money < totalPrice) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `User doesn't have enough money, needed: ${totalPrice}, has: ${receiver.money}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.listing.update({
      where: { id: listingId },
      data: {
        amount: { decrement: amount },
      },
    });
    await this.prisma.user.update({
      where: { id: receiverId },
      data: {
        UserHasProduct: {
          upsert: {
            update: {
              productId: listing.productId,
              amount: { increment: amount },
            },
            create: {
              productId: listing.productId,
              amount: amount,
            },
            where: {
              userId_productId: {
                userId: receiverId,
                productId: listing.productId,
              },
            },
          },
        },
        money: { decrement: totalPrice },
      },
    });
    await this.prisma.user.update({
      where: { id: listing.sellerId },
      data: {
        money: { increment: totalPrice },
      },
    });

    return this.prisma.transaction.create({
      data: {
        listingId,
        amount,
        senderId: listing.sellerId,
        receiverId: receiverId,
        productId: listing.productId,
      },
    });
  }

  findAll() {
    return this.prisma.transaction.findMany();
  }

  findOne(id: number) {
    return this.prisma.transaction.findUnique({ where: { id } });
  }
  delete(id: number) {
    return this.prisma.transaction.delete({ where: { id } });
  }
}
